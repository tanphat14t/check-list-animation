document.addEventListener("DOMContentLoaded", () => {
  // Lấy tất cả các phần tử wrapper-testimonial
  const wrapperTestimonials = document.querySelectorAll(".slider-wrapper");

  // Nếu có bất kỳ phần tử testimonial nào
  if (wrapperTestimonials.length > 0) {
    // Lặp qua từng phần tử wrapper
    wrapperTestimonials.forEach((wrapper) => {
      const testimonial = wrapper.querySelector(".scroll-item");
      console.log(wrapper);

      // Hàm để tính toán lượng cuộn cần thiết
      const getScrollAmount = () => {
        const racesWidth = testimonial.scrollWidth;
        return racesWidth - window.innerWidth - 80;
      };

      // Hàm để tạo tween animation cho testimonial
      const createTween = (testimonial, scrollAmount) => {
        return gsap.to(testimonial, {
          x: -scrollAmount,
          duration: 3,
          ease: "none",
        });
      };

      // Hàm để tạo ScrollTrigger cho phần tử wrapper
      const createScrollTrigger = (wrapper, tween, scrollAmount) => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top bottom-=400",
          end: `+=${scrollAmount}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: true,
        });
      };

      // Tính toán lượng cuộn cần thiết
      const scrollAmount = getScrollAmount();
      // Tạo tween animation cho testimonial
      const tween = createTween(testimonial, scrollAmount);
      // Tạo ScrollTrigger cho phần tử wrapper
      createScrollTrigger(wrapper, tween, scrollAmount);
    });

    // Làm mới ScrollTrigger sau khi tất cả triggers đã được thiết lập
    ScrollTrigger.refresh();
  }

  const items = document.querySelectorAll(".scroll-item .item");

  gsap.set(items, {
    scaleY: 0,
    opacity: 0,
  });
  gsap.set(items[0], {
    scaleY: 1,
  });
  // Create ScrollTrigger for each item
  items.forEach((item, index) => {
    const startOffset = window.innerHeight * 0.1 * index; // Modify the offset for each item (you can adjust this value)
    // const startOffset = window.innerHeight - 400;
    ScrollTrigger.create({
      trigger: item, // Each item element
      start: `top+=${startOffset} bottom`,
      end: `+=400px`,
      markers: true,
      animation: gsap.to(item, {
        // y: 0, // Move to the original position (y: 0)
        scaleY: 1,
        opacity: 1,
        // opacity: 1, // Set opacity to 1
        duration: 0.5, // Animation duration
        ease: "power2.out", // Easing for the animation
        // delay: 0.5,
      }),
      scrub: 1, // Sync with scroll
      // markers: true, // Enable markers (can be turned off for production)
    });
  });
});
