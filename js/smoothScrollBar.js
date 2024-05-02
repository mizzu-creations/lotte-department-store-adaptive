import { setScale } from "./utils.js";
const header = document.querySelector("header");
const sectionEnjoy = document.querySelector(".enjoy-your-time__wrap");
const sectionEnjoyTxt = document.querySelector(".enjoy-your-time__wrap p");
const sectionWhatsOn = document.querySelector(".whats-on-slider");
const sectionWhatsOnSlide = document.querySelector(".whats-on-slider ul");
const sectionWhatsOnSlideLi = sectionWhatsOnSlide.querySelectorAll(
  ".whats-on-slider ul li"
);
const sectionWhatsOnTxt = document.querySelector(".whats-on-slider h3");
const topBtn = document.querySelector("#scroll-to-top");

gsap.registerPlugin(ScrollTrigger);
const container = document.querySelector("#scroll-container");
const scrollBar = Scrollbar.init(container, {
  damping: 0.05,
});

ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollBar.scrollTop = value;
    }
    return scrollBar.scrollTop;
  },
});

scrollBar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: container });

let prevScrollY = 0;
const scrollOffset = () => {
  scrollBar.addListener(({ offset }) => {
    const currentScrollY = offset.y;

    if (currentScrollY <= 500 && prevScrollY > 500) {
      setScale(topBtn, 0.4, 0);
    } else if (currentScrollY > 500 && prevScrollY <= 500) {
      setScale(topBtn, 0.2, 1);
    }

    prevScrollY = currentScrollY;

    if (currentScrollY >= 100) {
      gsap.killTweensOf(header, "y");
      gsap.to(header, { y: -250, duration: 2 });
    }
    if (currentScrollY < 100) {
      gsap.killTweensOf(header, "y");
      gsap.to(header, { y: 0, duration: 0.5 });
    }
  });
};
scrollOffset();

topBtn.addEventListener("click", () => {
  scrollBar.scrollTo(0, 0, 3000);
});

ScrollTrigger.create({
  trigger: sectionEnjoy,
  start: "center center",
  end: "bottom center",
  animation: gsap.fromTo(sectionEnjoyTxt, { y: -40 }, { y: -500 }),
  markers: false,
  scrub: true,
});

let whatsOnScroll;

function setupScrollTrigger() {
  if (whatsOnScroll) {
    whatsOnScroll.kill(); // 이전 스크롤 트리거 삭제
  }

  whatsOnScroll = gsap.fromTo(
    sectionWhatsOnSlide,
    { x: 0 },
    {
      duration: 2.5,
      ease: "none",
      x: -sectionWhatsOnSlide.offsetWidth + sectionWhatsOn.offsetWidth,
      scrollTrigger: {
        start: "top 20%",
        trigger: sectionWhatsOn,
        pin: true,
        scrub: true,
        markers: true,
        id: "slide",
        onLeave: () => {
          scrollBar.scrollTo(0, 6000, 3000);
        },
      },
    }
  );

  // sectionWhatsOnSlideLi에 대한 스크롤 트리거 설정 추가
  ScrollTrigger.create({
    trigger: sectionWhatsOn,
    start: "top 80%",
    end: "top 40%",
    animation: gsap.fromTo(
      sectionWhatsOnSlideLi,
      {
        x: 150,
        opacity: 0,
        stagger: 0.1,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
      }
    ),
    markers: true,
    scrub: true,
  });
}

function setupTextAnimation() {
  const text = new SplitType(sectionWhatsOnTxt);

  ScrollTrigger.create({
    trigger: sectionWhatsOn,
    start: "20% center",
    end: "30% center",
    animation: gsap.fromTo(
      text.chars,
      { scaleX: 0, opacity: 0, stagger: 0.2 },
      { scaleX: 1, opacity: 1, stagger: 0.2 }
    ),
    scrub: true,
  });
}

setupScrollTrigger();
setupTextAnimation();

window.addEventListener("resize", () => {
  scrollBar.scrollTo(0, 0, 0);

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === sectionWhatsOn) {
      trigger.kill();
    }
  });

  // 새로운 스크롤 트리거 및 텍스트 애니메이션 설정
  setupScrollTrigger();
  setupTextAnimation();
});

const markers = () => {
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
};

markers();

export { scrollOffset, markers };
