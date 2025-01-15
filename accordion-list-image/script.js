const activeClass = "active";
const images = document.querySelectorAll(".flex-card-container");

images[0].classList.add(activeClass);

function removeActiveClass() {
  const elm = document.querySelector(`.${activeClass}`);
  if (elm) {
    elm.classList.remove(activeClass);
  }
}

function addClass($event) {
  $event.stopPropagation();
  removeActiveClass();
  const target = $event.currentTarget;
  target.classList.add(activeClass);
}

images.forEach((image) => {
  image.addEventListener("click", addClass);
});
