'use strict';
(function () {

  var clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
  };

  var thumb = document.querySelector('.video__thumb');
  var bar = document.querySelector('.video__bar');
  var THUMB_WIDTH = thumb.offsetWidth;

  thumb.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      thumb.style.left = clamp(thumb.offsetLeft - shift.x, bar.offsetLeft, bar.offsetLeft + bar.offsetWidth - THUMB_WIDTH) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var playerBar = document.querySelector('.video__player-bar');

  playerBar.addEventListener('click', function (evt) {
    evt.preventDefault();

    var barCoords = bar.getBoundingClientRect();

    thumb.style.left = evt.clientX + bar.offsetLeft - barCoords.x - THUMB_WIDTH / 2 + 'px';
  });

  var replayButton = document.querySelector('.video__button--replay');

  replayButton.addEventListener('click', function () {
    thumb.style.left = 0;
  });



  var isLiked = false;
  var likesCol = document.querySelectorAll('.gallery__likes');

  for (var i =0; i < likesCol.length; i++) {
    var icon = likesCol[i].querySelector('.gallery__likes-icon');
    var likesNumber = likesCol[i].querySelector('.gallery__likes-number');

    icon.addEventListener('click', function () {
      likesNumber.innerHTML = 1 + likesNumber.innerHTML;
    })
  }

})();
