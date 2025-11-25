$(function () {
  //smoothscroll
  //anchor
  $('a[href^="#"]').on('click touch', function () {
    var target = $(this.hash);
    if (target) {
      var targetY = target.offset().top;
      $('html,body').animate({ scrollTop: targetY }, 500);
      return false;
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  //swiper
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'fade',
    initialSlide: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
  })
});