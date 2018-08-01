'use strict';
(function () {

  var videoSlider = document.querySelector('.video__range-slider');
  var replayButton = document.querySelector('.video__button--replay');

  replayButton.addEventListener('click', function () {
    videoSlider.value = 0;
  });

  var countLikes = function (node) {
    var likesNumber = node.parentNode.querySelector('.gallery__likes-number')
      if (node.classList.contains('gallery__likes-icon--active')) {
        node.classList.remove('gallery__likes-icon--active');
        likesNumber.innerHTML = parseInt(likesNumber.innerHTML, 10) - 1;
        } else {
          node.classList.add('gallery__likes-icon--active');
          likesNumber.innerHTML = 1 + parseInt(likesNumber.innerHTML, 10);
        }
  };

  var likesCol = document.querySelectorAll('.gallery__likes');

  for (var i = 0; i < likesCol.length; i++) {
    var icon = likesCol[i].querySelector('.gallery__likes-icon');

    icon.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;

      while (target != icon) {
        if (target.tagName == 'svg') {
          countLikes(target);
          break;
        }
        target = target.parentNode;
      }
    });
  }

})();

(function () {
//  var picsCol = document.querySelectorAll('.gallery__item-image');
//  for (var i = 0; i < picsCol.length; i++) {
//    picsCol[i].a
//  }

  var popup = document.querySelector('.popup');
  console.log(popup);
  var popupContainer = popup.querySelector('.popup__container');
  var gallery = document.querySelector('.gallery__list');
  console.log(gallery);
  var next = popup.querySelector('.popup__next');
  var prev = popup.querySelector('.popup__prev');
  var currentIndex;
  var currentItem;

  var galleryItems = gallery.querySelectorAll('.gallery__item');

  var updateItem = function (index) {
    currentItem = galleryItems[index].cloneNode(true);
    popupContainer.appendChild(currentItem);
    console.log(currentItem);
    popup.querySelector('.gallery__item').classList.add('popup__gallery-item');
    popup.querySelector('.gallery__item-wrapper').classList.add('popup__item-wrapper');
    popup.querySelector('.gallery__item-author').classList.add('popup__item-author');
    popup.querySelector('.gallery__likes-icon').classList.add('popup__likes-icon');

    var image = popup.querySelector('img');
    var item = popup.querySelector('li');

    var imageName = image.dataset.filename;
    console.log(imageName);
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
    console.log(newImage);
  };

  gallery.addEventListener('click', function (evt) {
    var target = evt.target;
    console.log(target.id);
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
      console.log(currentIndex);
      updateItem(currentIndex);
    }
  });

  prev.addEventListener('click', function () {
    if (currentIndex > 0) {
      popupContainer.innerHTML = '';
      currentIndex = currentIndex - 1;
      console.log(currentIndex);
      updateItem(currentIndex);
    }
  });

})();
