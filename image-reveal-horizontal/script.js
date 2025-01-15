gsap.registerPlugin(ScrollTrigger);

let revealImageSec = document.querySelectorAll(".reveal-image-section");

revealImageSec.forEach((element) => {
  let image = element.querySelector(".reveal-image img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      toggleActions: "restart none none reset",
      markers: true,
    },
  });
  tl.set(element, { autoAlpha: 1 });
  tl.from(element, 1.5, {
    xPercent: -100,
    ease: Power2.out,
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.3,
    delay: -1.5,
    ease: Power2.out,
  });
});
