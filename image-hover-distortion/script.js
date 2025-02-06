document.querySelectorAll(".wrapper-img").forEach((wrapper) => {
  new hoverEffect({
    parent: wrapper,
    intensity1: 0.2,
    intensity2: 0.1,
    angle2: Math.PI / 2,
    image1: wrapper.getAttribute("data-image1"),
    image2: wrapper.getAttribute("data-image2"),
    displacementImage: wrapper.getAttribute("data-displacement"),
  });
});
