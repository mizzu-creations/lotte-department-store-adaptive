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
const sectionHotKeyword = document.querySelector(".hot-keyword");
let hotKeyword;
const sectionPlace = document.querySelector("section.place");
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

let prevScrollY = 0;
const scrollOffset = () => {
  scrollBar.addListener(({ limit, offset }) => {
    const currentScrollY = offset.y;
    hotKeyword = limit.y - offset.y / 2;

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

function setWhatsOnSlide() {
  if (whatsOnScroll) {
    whatsOnScroll.kill();
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
        onLeave: () => {
          scrollBar.scrollTo(0, hotKeyword, 5000);
        },
      },
    }
  );

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
    scrub: true,
  });
}

function setWhatsOnTxt() {
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

function setHotKeyword() {
  const sectionHotKeywordLeft =
    sectionHotKeyword.querySelector(".hot-keyword--left").children;
  const sectionHotKeywordRight = sectionHotKeyword.querySelectorAll(
    ".hot-keyword--right div"
  );
  const cursor = document.querySelector(".cursor");
  const hotKeywordTl = gsap.timeline();
  hotKeywordTl
    .fromTo(
      sectionHotKeywordLeft,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2 }
    )
    .fromTo(
      sectionHotKeywordRight,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
      }
    );

  ScrollTrigger.create({
    trigger: sectionHotKeyword,
    start: "0 70%",
    end: "0 50%",
    animation: hotKeywordTl,
    scrub: true,
  });

  ScrollTrigger.create({
    trigger: sectionHotKeyword,
    start: "top center",
    end: "70% center",
    animation: gsap.to(sectionHotKeyword, {
      opacity: 1,
    }),
    markers: true,
    scrub: true,
    onLeave: () => {
      scrollBar.scrollTo(0, 4800, 1000);
      gsap.to(cursor, { backgroundColor: "#f653f9", duration: 0.2 });
    },
    onEnterBack: () => {
      scrollBar.scrollTo(0, 3300, 1000);
      gsap.to(cursor, { backgroundColor: "#09ac06", duration: 0.2 });
    },
  });
}

setWhatsOnSlide();
setWhatsOnTxt();
setHotKeyword();

// ScrollTrigger.create({
//   trigger: sectionPlace,
//   start: "0% center",
//   end: "10% center",
//   animation: scrollBar.scrollTo(0, 4000, 3000),
//   pin: false,
//   pinSpacing: false,
//   markers: true,
//   scrub: true,
// });

window.addEventListener("resize", () => {
  scrollBar.scrollTo(0, 0, 0);

  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger === sectionWhatsOn ||
      trigger.trigger === sectionHotKeyword
    ) {
      trigger.kill();
    }
  });

  setWhatsOnSlide();
  setWhatsOnTxt();
  setHotKeyword();
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
