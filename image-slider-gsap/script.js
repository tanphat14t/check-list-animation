let currentIndex = 1;
let totalSlides = document.querySelectorAll(".slide-titles .title").length;
console.log(totalSlides);

const updateActiveSlides = () => {
  document.querySelectorAll(".slide-titles .title").forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};
const handleSlider = () => {
  if (currentIndex < totalSlides) {
    currentIndex++;
  } else {
    currentIndex = 1;
  }

  gsap.to(".slide-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlides();
      }, 100);

      updateImages(currentIndex + 1);
    },
    x: `-${(currentIndex - 1) * 11}%`,
    duration: 2,
    ease: "power4.out",
  });
};

const updateImages = () => {
  for (let imgNumber = 1; imgNumber <= 6; imgNumber++) {
    const imgSrc = `./images/img${imgNumber}.webp`; // Generate image source
    const imgTop = document.createElement("img");
    const imgBottom = document.createElement("img");

    imgTop.src = imgSrc;
    imgBottom.src = imgSrc;

    imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgBottom.style.clipPath =
      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgTop.style.transform = "scale(2)";
    imgBottom.style.transform = "scale(2)";

    document.querySelector(".img-top").appendChild(imgTop);
    document.querySelector(".img-bottom").appendChild(imgBottom);

    gsap.to([imgTop, imgBottom], {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      transform: "scale(1)",
      duration: 2,
      ease: "power4.out",
      stagger: 0.15,
      onComplete: trimExcessImage,
    });
  }
};

const trimExcessImage = () => {
  const selectors = [".img-top", ".img-bottom"];

  selectors.forEach((selector) => {
    const container = document.querySelector(selector);
    const images = Array.from(container.querySelectorAll("img"));

    const exessCount = images.length - 4;

    if (exessCount > 0) {
      images.slice(0, exessCount).forEach((img) => {
        container.removeChild(img);
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleSlider);

  updateImages(2);

  updateActiveSlides();
});
