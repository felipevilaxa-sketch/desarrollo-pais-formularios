(function () {
    'use strict';

    const ready = new WeakSet();
    const pending = new WeakSet();

    document.addEventListener('submit', async function (event) {
        const form = event.target;
        if (!(form instanceof HTMLFormElement) || !form.matches('.wpcf7 form')) return;
        if (ready.has(form)) {
            ready.delete(form);
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        if (pending.has(form)) return;
        pending.add(form);
        const submitter = event.submitter;

        try {
            const response = await fetch(naitusCf7Csrf.url, {
                method: 'POST',
                credentials: 'same-origin',
                cache: 'no-store',
                body: new URLSearchParams({ action: 'naitus_cf7_csrf' }),
                signal: AbortSignal.timeout(15000)
            });
            const result = await response.json();
            if (!response.ok || !result.success ||
                !/^[a-f0-9]{64}$/.test(result.data?.token)) throw new Error('csrf');

            let field = form.querySelector('input[name="csrf_token"]');
            if (!field) {
                field = document.createElement('input');
                field.type = 'hidden';
                field.name = 'csrf_token';
                form.appendChild(field);
            }
            field.value = result.data.token;
            ready.add(form);
            try {
                form.requestSubmit(submitter && submitter.form === form ? submitter : undefined);
            } finally {
                ready.delete(form);
            }
        } catch (error) {
            const output = form.querySelector('.wpcf7-response-output');
            if (output) {
                form.dataset.status = 'validation_failed';
                form.classList.remove('init', 'sent', 'failed', 'invalid');
                form.classList.add('invalid');
                output.textContent = naitusCf7Csrf.error;
                output.setAttribute('role', 'alert');
                output.removeAttribute('aria-hidden');
            }
        } finally {
            pending.delete(form);
        }
    }, true);
}());
