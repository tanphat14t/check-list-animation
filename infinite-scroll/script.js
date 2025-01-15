document.addEventListener("DOMContentLoaded", () => {
  const totalSlides = 6;
  let currentSlide = 1;
  let isAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;

  const slideTitles = [
    "Field Unit",
    "Astral Convergrence",
    "Lumis",
    "Serenity",
    "Interstellar",
    "Elysium",
    "Inverted",
  ];

  const slideDescriptions = [
    "Field Unit",
    "Astral Convergrence",
    "Serenity",
    "Interstellar",
    "Elysium",
    "Lumis",
    "Inverted",
  ];

  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");

    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `images/img${slideNumber}.webp`;
    img.alt = "";

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    if (direction == "down") {
      slideBgImg.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    }
    return slide;
  }

  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `images/img${slideNumber}.webp`;
    img.alt = "";

    wrapper.appendChild(img);

    if (direction == "down") {
      wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
    } else {
      wrapper.style.clipPath =
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    }
    return wrapper;
  }

  function createTextElement(slideNumber, direction) {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, {
      y: direction === "down" ? 80 : -80,
    });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    gsap.set(newDescription, {
      y: direction === "down" ? 20 : -20,
    });
    return { newTitle, newDescription };
  }

  function animateSlide(direction) {
    if (isAnimating || !scrollAllowed) return;

    isAnimating = true;
    scrollAllowed = false;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    console.log(mainImageContainer);

    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper"
    );

    const titleContainer = document.querySelector(".slide-title");
    const descriptionContainer = document.querySelector(".slide-description");

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");

    if (direction === "down") {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    const newSlide = createSlide(currentSlide, direction);
    const newMainWrapper = createMainImageWrapper(currentSlide, direction);

    const { newTitle, newDescription } = createTextElement(
      currentSlide,
      direction
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
        ].forEach((el) => el.remove());
        isAnimating = false;
        setTimeout(() => {
          scrollAllowed = true;
          lastScrollTime = Date.now();
        }, 100);
      },
    });
    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100% , 100% 0%,0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%,0% 100%)",
        duration: 1.25,
        ease: CustomEase.create("", "0.87,0,0.13,1"),
      },
      0
    );

    tl.to(
      newMainWrapper,
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 0%, 100% 0% , 100% 100%,0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 0%,0% 0%)",
        duration: 1.25,
        ease: CustomEase.create("", "0.87,0,0.13,1"),
      },
      0
    );

    tl.to(
      newMainWrapper.querySelector("img"),
      {
        y: "0%",
        duration: 1.25,
        ease: CustomEase.create("", "0.87,0,0.13,1"),
      },
      0
    );
    tl.to(
      newTitle,
      {
        y: "0%",
        duration: 1.25,
        ease: CustomEase.create("", "0.87,0,0.13,1"),
      },
      0
    );
    tl.to(
      currentDescription,
      {
        y: direction === "down" ? -40 : 40,
        // y: "0%",
        duration: 1.25,
        ease: CustomEase.create("", "0.87,0,0.13,1"),
      },
      0
    );
  }
  function handleScroll(direction) {
    const now = Date.now();
    if (isAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 1000) return;
    lastScrollTime = now;
    animateSlide(direction);
  }

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    },
    {
      passive: false,
    }
  );

  let touchStartY = 0;
  let isTouchActive = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    },
    {
      passive: false,
    }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;

      if (Math.abs(difference) > 10) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    },
    {
      passive: false,
    }
  );
  window.addEventListener("touchend", () => {
    isTouchActive = false;
  });
});
