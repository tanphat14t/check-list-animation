gsap.config({ trialWarn: false });
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitType);

const split = new SplitType("p", { type: "chars" });

split.lines.forEach((target) => {
  gsap.to(target, {
    backgroundPositionX: 0,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      markers: true,
      scrub: 1,
      start: "top center",
      end: "bottom center",
    },
  });
});
