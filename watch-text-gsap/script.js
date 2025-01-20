document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const animateChars = (chars, reverse = false) => {
    const staggerOptions = {
      each: 0.35,
      from: reverse ? "end" : "start",
      ease: "linear",
    };
    gsap.fromTo(
      chars,
      {
        fontWeight: 100,
      },
      {
        fontWeight: 900,
        duration: 1,
        ease: "none",
        stagger: staggerOptions,
        scrollTrigger: {
          trigger: chars[0].closest(".marquee-container"),
          start: "center bottom",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  };

  const splitText = new SplitType(".item h1", { types: "chars" });
  const splitText2 = new SplitType(".item p", { types: "chars" });

  const marqueeContainers = document.querySelectorAll(".marquee-container");

  marqueeContainers.forEach((container, index) => {
    let start = "0%";
    let end = "-15%";

    if (index % 2 === 0) {
      start = "0%";
      end = "10%";
    }

    const marquee = container.querySelector(".marquee");
    const words = marquee.querySelectorAll(".item h1");
    const word2 = marquee.querySelectorAll(".item p");

    gsap.fromTo(
      marquee,
      {
        x: start,
      },
      {
        x: end,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "150% 40%",
          scrub: true,
          markers: true,
        },
      }
    );

    words.forEach((word, index) => {
      const chars = Array.from(word.querySelectorAll(".char"));
      if (chars.length) {
        const reverse = index % 2 !== 0;
        animateChars(chars, reverse);
      }
    });
    word2.forEach((word, index) => {
      const chars = Array.from(word.querySelectorAll(".char"));
      if (chars.length) {
        const reverse = index % 2 !== 0;
        animateChars(chars, reverse);
      }
    });
  });
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);
});
