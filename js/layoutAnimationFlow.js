const mouseCursor = document.querySelector(".cursor");
const body = document.querySelector("body");
const header = document.querySelector("header");
const headerDimmed = document.querySelector("header .search-dimmed");
const startLayer = document.querySelector(".start-layer");
const layer01 = document.querySelector(".enjoy-your-time");
const layer01Bg = document.querySelector(".enjoy-your-time__wrap");
const layer01Img = document.querySelector(".enjoy-your-time img");
const scrollTopBtn = document.querySelector("#scroll-to-top");
const text = new SplitType(".enjoy-your-time p");
const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

tl.set(body, {
  overflow: "hidden",
})
  .set(header, { y: -200, opacity: 0 })
  .set(layer01, { backgroundColor: "#F8D873", opacity: 0 })
  .set(layer01Bg, { backgroundColor: "#F8D873" })
  .set(text.chars, { y: 50, opacity: 0 })
  .to(startLayer, {
    yPercent: -100,
    delay: 2,
    duration: 1.5,
  })
  .fromTo(
    scrollTopBtn,
    { opacity: 0, scale: 1 },
    { opacity: 1, duration: 0.5 },
    "-=2.5"
  )
  .to(scrollTopBtn, { scale: 0, duration: 0.5 }, "-=1.5")
  .to(layer01, { opacity: 1, duration: 0.5 }, "-=1.5")
  .fromTo(
    layer01Img,
    {
      y: 100,
      scale: 2,
    },
    {
      y: -10,
      duration: 2.5,
    },
    "-=2"
  )
  .to(layer01Img, {
    y: 0,
    scale: 1,
    duration: 1.5,
  })
  .to(layer01, { backgroundColor: "#FFFFFF", duration: 1.5 }, "-=1.5")
  .to(layer01Bg, { backgroundColor: "#FFFFFF", duration: 1.5 }, "<")
  .to(header, { y: 0, opacity: 1, duration: 2 }, "-=1")
  .to(
    text.chars,
    {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05 },
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          body.style.overflow = "auto";
          headerDimmed.style.display = "none";
          mouseCursor.style.display = "block";
        }, 500);
      },
    },
    "-=1.5"
  );

tl.pause();

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  tl.play();
});
window.addEventListener("resize", () => {
  tl.restart();
});
