(() => {
// // Hamburger
let hamburger = document.querySelector(".hamburger");
hamburger?.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
});

// Menu toggle
const masterBody = document.querySelector('body');
let buttonOpenMenu = document.querySelector('[openSlideMenu]');
let buttonCloseMenu = document.querySelector('[closeSlideMenu]');
let slideMenu = document.querySelector('.header__menu-inner');
let backdrop = document.querySelector('.backdrop__menu');
buttonOpenMenu?.addEventListener('click', function(){
  if (!slideMenu) return;
  slideMenu.classList.toggle('open');
  if(slideMenu.classList.contains('open')){
    disableScroll();
    backdrop?.classList.add('show');
  } else {
    enableScroll();
    backdrop?.classList.remove('show');
  }
});
buttonCloseMenu?.addEventListener('click', function(){
  slideMenu?.classList.remove('open');
  enableScroll();
  backdrop?.classList.remove('show');
});

// Disable Scroll
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  //masterBody.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  //masterBody.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  //masterBody.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  //masterBody.addEventListener('keydown', preventDefaultForScrollKeys, false);
  masterBody?.classList.add('no-scroll');
}

// call this to Enable
function enableScroll() {
  //masterBody.removeEventListener('DOMMouseScroll', preventDefault, false);
  //masterBody.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  //masterBody.removeEventListener('touchmove', preventDefault, wheelOpt);
  //masterBody.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  masterBody?.classList.remove('no-scroll');
}

// Search Div toggle
let buttonOpenSearch = document.querySelector('[openSearch]');
let buttonsCloseSearch = document.querySelectorAll('[closeSearch]');
let searchContainer = document.querySelector('.container-search');
let inputSearch = document.querySelector('.search-form input[type=text]');
buttonOpenSearch?.addEventListener('click', function(){
  if (!searchContainer) return;
  searchContainer.classList.toggle('open');
  this.classList.toggle('active');
  inputSearch?.focus();
});
buttonsCloseSearch.forEach((button) => button.addEventListener('click', function(){
  searchContainer?.classList.remove('open');
  buttonOpenSearch?.classList.remove('active');
}));


// SMART Menu
let previousScrollPosition = 0;
const isScrollingDown = () => {
  let currentScrolledPosition = window.scrollY || window.pageYOffset;
  let scrollingDown;
  if (currentScrolledPosition > previousScrollPosition) {
    scrollingDown = true;
  } else {
    scrollingDown = false;
  }
  previousScrollPosition = currentScrolledPosition;
  return scrollingDown;
};

const nav = document.querySelector(".--header-fixed");
const scrollAdv = document.querySelector('body');
const handleNavScroll = () => {
  if (!nav || !scrollAdv) return;
  if (isScrollingDown() && !nav.contains(document.activeElement)) {
    scrollAdv.classList.add('scroll-down');
    scrollAdv.classList.remove('scroll-up');
  } else {
    scrollAdv.classList.add('scroll-up');
    scrollAdv.classList.remove('scroll-down');
  }
};

var throttleWait;
const throttle = (callback, time) => {
  if (throttleWait) return;

  throttleWait = true;

  setTimeout(() => {
    callback();
    throttleWait = false;
  }, time);
};

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  if (mediaQuery && !mediaQuery.matches) {
    throttle(handleNavScroll, 250);
  }
});


})();
