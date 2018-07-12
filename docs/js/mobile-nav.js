'use strict';

(function () {

  var navMain = document.querySelector('.main-nav');
  var toggleOpen = document.querySelector('.main-nav__open');
  var toggleClose = document.querySelector('.main-nav__close');

  navMain.classList.remove('main-nav--nojs');

  toggleOpen.addEventListener('click', function() {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    });

  toggleClose.addEventListener('click', function () {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  });
})();
