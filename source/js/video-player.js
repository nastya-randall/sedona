'use strict';
(function () {

  var videoSlider = document.querySelector('.video__range-slider');
  var replayButton = document.querySelector('.video__button--replay');

  replayButton.addEventListener('click', function () {
    videoSlider.value = 0;
  });



  var isLiked = false;
  var likesCol = document.querySelectorAll('.gallery__likes');

  for (var i = 0; i < likesCol.length; i++) {
//    var icon = likesCol[i].querySelector('.gallery__likes-icon');

    likesCol[i].addEventListener('click', function (evt) {
      console.log(evt.target);
      var likesNumber = evt.target.querySelector('.gallery__likes-number');
      console.log(likesNumber);
      likesNumber.innerHTML = 1 + parseInt(likesNumber.innerHTML, 10);
    })
  }

})();
