import { setScale } from "./utils.js";
const header = document.querySelector("header");
const topBtn = document.querySelector("#scroll-to-top");

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector("#scroll-container");
const scrollBar = Scrollbar.init(container, {
  damping: 0.1,
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

// 스크롤 트리거 코드 작성
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
      gsap.to(header, { y: -250, duration: 1.5, delay: 0.2 });
    }
    if (currentScrollY < 100) {
      gsap.killTweensOf(header, "y");
      gsap.to(header, { y: 0, duration: 0.5 });
    }
  });
};

scrollOffset();

const markers = () => {
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
};

export { scrollOffset, markers };
