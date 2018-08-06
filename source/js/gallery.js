'use strict';

(function () {

  var popup = document.querySelector('.popup');
  var popupContainer = popup.querySelector('.popup__container');
  var ESC_KEYCODE = 27;
  var gallery = document.querySelector('.gallery__list');
  var next = popup.querySelector('.popup__nav--next');
  var prev = popup.querySelector('.popup__nav--prev');
  var currentIndex;
  var currentItem;

  var galleryItems = gallery.querySelectorAll('.gallery__item');

  var showNav = function (index) {
    if(index != 0) {
      prev.classList.remove('popup__nav--hide');
      prev.classList.add('popup__nav--show');
    }
    if (index != galleryItems.length - 1) {
      next.classList.remove('popup__nav--hide');
      next.classList.add('popup__nav--show');
    }
  };

  var hideNav = function () {
    prev.classList.remove('popup__nav--show');
    prev.classList.add('popup__nav--hide');
    next.classList.remove('popup__nav--show');
    next.classList.add('popup__nav--hide');
  };

  var updateItem = function (index) {
    currentItem = galleryItems[index].cloneNode(true);
    popupContainer.appendChild(currentItem);
    popup.querySelector('.gallery__item').classList.add('popup__gallery-item');
    popup.querySelector('.gallery__item-wrapper').classList.add('popup__item-wrapper');
    popup.querySelector('.gallery__item-author').classList.add('popup__item-author');
    popup.querySelector('.gallery__likes-icon').classList.add('popup__likes-icon');

    var image = popup.querySelector('img');
    var item = popup.querySelector('li');

    var imageName = image.dataset.filename;
    if (image.currentSrc.includes('webp')) {
      item.removeChild(item.querySelector('picture'));

      var newImage = document.createElement('img');
      newImage.src = 'img/photo-' + imageName;

      if (window.matchMedia('(min-width: 1200px)').matches) {
        if (index != 0) {
          newImage.src = newImage.src + '-desktop@2x.webp';
        } else {
          newImage.src = newImage.src + '-tablet@2x.webp';
        }
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        newImage.src = newImage.src + '-tablet@2x.webp';
      } else {
        newImage.src = newImage.src + '-mobile@2x.webp';
      }

      item.insertBefore(newImage, item.firstChild);
    }
    image.src = image.src.replace('1x','2x');
    newImage.classList.add('popup__item-image');
    hideNav();
    showNav(index);
  };

  gallery.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName != 'IMG') {
      return;
    } else {
      popup.classList.add('popup--show');
      currentIndex = parseInt(target.id, 10);

      updateItem(currentIndex);
    }

    });

  next.addEventListener('click', function () {
    if (currentIndex < galleryItems.length - 1) {
      popupContainer.innerHTML = '';
      currentIndex = currentIndex + 1;
      updateItem(currentIndex);
    }
  });

  prev.addEventListener('click', function () {
    if (currentIndex > 0) {
      popupContainer.innerHTML = '';
      currentIndex = currentIndex - 1;
      updateItem(currentIndex);
    }
  });

  var closePopup = function () {
    popupContainer.innerHTML = '';
    popup.classList.remove('popup--show');
  };

  var overlay = popup.querySelector('.popup__overlay');

  overlay.addEventListener('click', closePopup);

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault ();
        if (popup.classList.contains("popup--show")) {
            closePopup();
        }
    }
});

})();
