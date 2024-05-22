import { setScale } from "./utils.js";

const topBtn = document.querySelector("#scroll-to-top");
const topBtnCircle = document.querySelector("#scroll-to-top .circle");
const topBtnArrow = document.querySelector("#scroll-to-top svg");
let isAnimationPlaying = false;

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
window.addEventListener("load", () => {
  gsap.to(topBtnArrow, {
    xPercent: -50,
    yPercent: 1000,
  });
});
