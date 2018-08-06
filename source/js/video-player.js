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
