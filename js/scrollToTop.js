import { setScale } from "./utils.js";

const topBtn = document.querySelector("#scroll-to-top");
const topBtnCircle = document.querySelector("#scroll-to-top .circle");
const topBtnArrow = document.querySelector("#scroll-to-top img");
let isAnimationPlaying = false;
let prevScrollY = 0;

const toBtnTl = gsap
  .timeline({ paused: true })
  .to(".text", {
    y: -35,
    opacity: 0,
    ease: "power3.inOut",
    stagger: {
      amount: 0.1,
    },
  })
  .to(
    topBtnArrow,
    {
      yPercent: -50,
      duration: 0.2,
    },
    "-=0.3"
  );

topBtn.addEventListener("mouseover", () => {
  if (!isAnimationPlaying) {
    setScale(topBtnCircle, 0.3, 0.9);
    toBtnTl.play();
    isAnimationPlaying = true;
  }
});
topBtn.addEventListener("mouseleave", () => {
  if (isAnimationPlaying) {
    setScale(topBtnCircle, 0.3, 1);
    toBtnTl.reverse(0);
    isAnimationPlaying = false;
  }
});
topBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  gsap.to(topBtnArrow, {
    xPercent: -50,
    yPercent: 1000,
  });
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY <= 1000 && prevScrollY > 1000) {
    setScale(topBtn, 0.4, 0);
  } else if (currentScrollY > 1000 && prevScrollY <= 1000) {
    setScale(topBtn, 0.2, 1);
  }

  prevScrollY = currentScrollY;
});
