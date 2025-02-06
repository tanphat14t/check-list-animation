var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 24,
  autoplay: {
    delay: 1,
    reverseDirection: true,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  freeMode: true,
  speed: 10000,
});
var swiper2 = new Swiper(".mySwiper2", {
  direction: "vertical",
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 24,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  freeMode: true,
  speed: 10000,
});
