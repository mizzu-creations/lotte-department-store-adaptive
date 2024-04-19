const cursor = document.querySelector(".cursor");
const cursorPrev = document.querySelector(".cursor-slide.prev");
const cursorNext = document.querySelector(".cursor-slide.next");
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

// card.addEventListener("mouseover", () => {
//   cursor.classList.add("more");
//   scaleCursor(5);
// });
// card.addEventListener("mouseleave", () => {
//   cursor.classList.remove("more");
//   scaleCursor(1);
// });

// list.addEventListener("mouseover", () => {
//   gsap.to(cursorPrev, 1, {
//     opacity: 1,
//   });
//   gsap.to(cursorNext, 1, {
//     opacity: 1,
//   });
// });
// list.addEventListener("mouseleave", () => {
//   gsap.to(cursorPrev, 1, {
//     opacity: 0,
//   });
//   gsap.to(cursorNext, 1, {
//     opacity: 0,
//   });
// });
// list.addEventListener("mousedown", (e) => {
//   isSlideOpen = true;
//   setCursorPosition(e.clientX, e.clientY);
//   scaleCursor(2);
// });
// list.addEventListener("mouseup", (e) => {
//   isSlideOpen = false;
//   setCursorPosition(e.clientX, e.clientY);
//   scaleCursor(1);
// });

window.addEventListener("mousemove", (e) => {
  gsap.to(cursor, 0.4, {
    opacity: 1,
    delay: 0.2,
  });
  setCursorPosition(e.clientX, e.clientY);
});
window.addEventListener("mousedown", (e) => {
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
