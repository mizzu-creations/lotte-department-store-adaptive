const cursor = document.querySelector(".cursor");
const cursorPrev = document.querySelector(".cursor-slide.prev");
const cursorNext = document.querySelector(".cursor-slide.next");

const sectionWhatsOnSlide = document.querySelector(".whats-on-slider ul");
const sectionWhatsOnSlideLi = sectionWhatsOnSlide.querySelectorAll(
  ".whats-on-slider ul li .slide"
);
const sectionHotKeywordTags = document.querySelectorAll(
  ".hot-keyword--right span"
);
const sectionPlace = document.querySelector(".place-eat-culture");

// const card = document.querySelector(".sample");
// const list = document.querySelector(".sample2");
let isSlideOpen = false;

function setCursorPosition(left, top) {
  gsap.to(cursor, 0.4, {
    left: `${left}px`,
    top: `${top}px`,
  });
  if (isSlideOpen) {
    gsap.to(cursorPrev, 0.4, {
      left: `${left - 70}px`,
      top: `${top - 10}px`,
    });
    gsap.to(cursorNext, 0.4, {
      left: `${left + 70}px`,
      top: `${top - 10}px`,
    });
  } else {
    gsap.to(cursorPrev, 0.4, {
      left: `${left - 60}px`,
      top: `${top - 10}px`,
    });
    gsap.to(cursorNext, 0.4, {
      left: `${left + 60}px`,
      top: `${top - 10}px`,
    });
  }
}
function scaleCursor(scale) {
  gsap.to(cursor, 0.4, {
    scale: scale,
  });
}

sectionWhatsOnSlide.addEventListener("mouseover", () => {
  gsap.to(cursorPrev, 1, {
    opacity: 1,
  });
  gsap.to(cursorNext, 1, {
    opacity: 1,
  });
});
sectionWhatsOnSlide.addEventListener("mouseleave", () => {
  gsap.to(cursorPrev, 1, {
    opacity: 0,
  });
  gsap.to(cursorNext, 1, {
    opacity: 0,
  });
});
sectionWhatsOnSlide.addEventListener("mousedown", (e) => {
  isSlideOpen = true;
  setCursorPosition(e.clientX, e.clientY);
  scaleCursor(2);
  if (e.target.tagName === "SPAN") {
    cursorPrev.style.display = "block";
    cursorNext.style.display = "block";
    cursor.classList.remove("more");
  }
});
sectionWhatsOnSlide.addEventListener("mouseup", (e) => {
  isSlideOpen = false;
  setCursorPosition(e.clientX, e.clientY);
  if (e.target.tagName === "SPAN") {
    cursorPrev.style.display = "none";
    cursorNext.style.display = "none";
    cursor.classList.add("more");
    scaleCursor(5);
  } else {
    scaleCursor(1);
  }
});

sectionWhatsOnSlideLi.forEach((list) => {
  list.addEventListener("mouseover", () => {
    cursorPrev.style.display = "none";
    cursorNext.style.display = "none";
    cursor.classList.add("more");
    scaleCursor(5);
  });
  list.addEventListener("mouseleave", () => {
    cursorPrev.style.display = "block";
    cursorNext.style.display = "block";
    cursor.classList.remove("more");
    scaleCursor(1);
  });
});

sectionHotKeywordTags.forEach((tag) => {
  tag.addEventListener("mousemove", () => {
    scaleCursor(2);
  });
  tag.addEventListener("mouseleave", () => {
    scaleCursor(1);
  });
});

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, 0.4, {
    opacity: 1,
    delay: 0.2,
  });
  setCursorPosition(e.clientX, e.clientY);
  if (e.target.closest("section") === sectionPlace) {
    gsap.to(cursor, { backgroundColor: "#f653f9", duration: 0.2 });
  } else {
    gsap.to(cursor, { backgroundColor: "#09ac06", duration: 0.2 });
  }
});
window.addEventListener("mousedown", () => {
  scaleCursor(2);
});
window.addEventListener("mouseup", (e) => {
  // isSlideOpen = false;
  // if (e.target.classList.value !== "sample") {
  //   setCursorPosition(e.clientX, e.clientY);
  //   scaleCursor(1);
  // }
  scaleCursor(1);
});
