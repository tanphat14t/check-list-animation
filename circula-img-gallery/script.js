const items = document.querySelectorAll(".item");
const container = document.querySelector(".container");

const numberOfItems = items.length;

const angleIncrement = (2 * Math.PI) / numberOfItems;
const radius = 240;
let isGalleryOpen = false;

const centerX = container.offsetWidth / 2;
const centerY = container.offsetHeight / 2;

const tl = gsap.timeline();
items.forEach((item, index) => {
  const angle = index * angleIncrement;
  const initialRotation = (angle * 180) / Math.PI - 90;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  gsap.set(item, {
    scale: 0,
  });

  tl.to(
    item,
    {
      left: x + "px",
      top: y + "px",
      rotation: initialRotation,
      ease: "power3.inOut",
      scale: 1,
      duration: 1,
      delay: 1,
    },
    index * 0.1
  );

  item.addEventListener("click", () => {
    if (!isGalleryOpen) {
      isGalleryOpen = true;
    }

    const duplicate = item.cloneNode(true);

    duplicate.style.position = "absolute";
    container.appendChild(duplicate);

    gsap.to(
      Array.from(items).filter((i) => i !== item),
      {
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.05,
      }
    );

    const endRotation =
      initialRotation > 180 ? initialRotation - 360 : initialRotation;

    gsap.to([item, duplicate], {
      rotation: endRotation,
      duration: 0.0001,
      onComplete: function () {
        gsap.to([item, duplicate], {
          left: "50%",
          top: "50%",
          duration: 1,
          ease: "power2.inOut",
          delay: 1.25,
          transform: "translate(-50%, -50%) scale(5)",
        });
      },
    });

    const closeGallery = function () {
      if (isGalleryOpen) {
        isGalleryOpen = false; // Reset the gallery state

        gsap.to([item, duplicate], {
          left: x + "px",
          top: y + "px",
          rotation: initialRotation,
          ease: "power2.out",
          scale: 1,
          duration: 1,
          onComplete: function () {
            duplicate.remove();
            gsap.to(items, {
              scale: 1,
              duration: 1,
              stagger: 0.05,
              ease: "power2.out",
            });
          },
        });

        // Remove the event listeners to prevent stacking
        item.removeEventListener("click", closeGallery);
        duplicate.removeEventListener("click", closeGallery);
      }
    };

    // Add the closeGallery event listener
    item.addEventListener("click", closeGallery);
    duplicate.addEventListener("click", closeGallery);
  });
});
