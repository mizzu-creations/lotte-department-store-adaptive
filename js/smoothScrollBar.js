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
const sectionPlace = document.querySelector(".place-eat-culture");
const sectionPlaceTitle = sectionPlace.querySelector(".place-eat-culture h3");
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

    if (currentScrollY <= 500 && prevScrollY > 500) {
      setScale(topBtn, 0.4, 0);
    } else if (currentScrollY > 500 && prevScrollY <= 500) {
      setScale(topBtn, 0.2, 1);
    }

    const testHeight = document.querySelector(".test-section").offsetHeight;
    const footerHeight = document.querySelector("footer").offsetHeight;
    const bottomValue = 50 + footerHeight + offset.y - limit.y;

    if (currentScrollY > limit.y - testHeight + footerHeight) {
      gsap.to(document.querySelector("body"), {
        backgroundColor: "#000000",
        duration: 1,
      });
      gsap.to(document.querySelector(".test-section"), {
        backgroundColor: "#000000",
        duration: 1,
      });
      gsap.to("#scroll-to-top .circle", {
        backgroundColor: "#ffffff",
      });
      gsap.to("#scroll-to-top .text-wrap", {
        color: "#000000",
      });
    } else {
      gsap.to(document.querySelector("body"), {
        backgroundColor: "#ffffff",
        duration: 1,
      });
      gsap.to(document.querySelector(".test-section"), {
        backgroundColor: "#ffffff",
        duration: 1,
      });
      gsap.to("#scroll-to-top .circle", {
        backgroundColor: "#000000",
      });
      gsap.to("#scroll-to-top .text-wrap", {
        color: "#ffffff",
      });
    }

    if (currentScrollY > limit.y - footerHeight) {
      topBtn.style.bottom = `${bottomValue}px`;
    } else {
      topBtn.style.bottom = "50px";
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
  scrub: 2,
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
      x: -sectionWhatsOnSlide.offsetWidth + sectionWhatsOn.offsetWidth,
      ease: "none",
      scrollTrigger: {
        start: "top 20%",
        trigger: sectionWhatsOn,
        pin: true,
        scrub: true,
        onLeave: () => {
          scrollBar.scrollTo(0, 3300, 5000);
        },
      },
    }
  );
  gsap.to(sectionWhatsOnSlideLi, {
    x: 200,
    opacity: 0,
  });
  ScrollTrigger.create({
    trigger: sectionWhatsOn,
    start: "top center",
    end: "top center",
    onEnter: () => {
      gsap.to(sectionWhatsOnSlideLi, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    },
    onEnterBack: () => {
      gsap.to(sectionWhatsOnSlideLi, {
        x: 200,
        opacity: 0,
        stagger: { each: 0.2, ease: "power3.inOut" },
      });
    },
  });
}

function setWhatsOnTxt() {
  const text = new SplitType(sectionWhatsOnTxt);
  gsap.to(text.chars, { scaleX: 0, opacity: 0 });

  ScrollTrigger.create({
    trigger: sectionWhatsOn,
    start: "30% center",
    end: "30% center",
    onEnter: () => {
      gsap.to(text.chars, { scaleX: 1, opacity: 1, stagger: 0.05 });
    },
    onEnterBack: () => {
      gsap.to(text.chars, {
        scaleX: 0,
        opacity: 0,
        stagger: { each: 0.05, from: "end" },
      });
    },
  });
}

function setHotKeyword() {
  const sectionHotKeywordLeft =
    sectionHotKeyword.querySelector(".hot-keyword--left").children;
  const sectionHotKeywordRight = sectionHotKeyword.querySelectorAll(
    ".hot-keyword--right div"
  );
  const hashTags = document.querySelectorAll(".hot-keyword--right div span");
  const cursor = document.querySelector(".cursor");
  gsap.to(sectionHotKeywordLeft, { y: 100, opacity: 0 });
  gsap.to(sectionHotKeywordRight, { y: 100, opacity: 0 });

  ScrollTrigger.create({
    trigger: sectionHotKeyword,
    start: "top 60%",
    end: "top 60%",
    onEnter: () => {
      gsap.to(sectionHotKeywordLeft, { y: 0, opacity: 1, stagger: 0.2 });
      gsap.to(sectionHotKeywordRight, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
      });
      gsap.fromTo(
        hashTags,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, stagger: 0.1 }
      );
    },
    onEnterBack: () => {
      gsap.to(sectionHotKeywordLeft, { y: 100, opacity: 0 });
      gsap.to(sectionHotKeywordRight, { y: 100, opacity: 0 });
    },
  });

  ScrollTrigger.create({
    trigger: sectionHotKeyword,
    start: "top center",
    end: "top center",
    animation: gsap.to(sectionHotKeyword, {
      opacity: 1,
    }),
    markers: false,
    scrub: true,
    onLeave: () => {
      // scrollBar.scrollTo(0, 4700, 3000);
      gsap.to(cursor, { backgroundColor: "#f653f9", duration: 0.2 });
      // gsap.to(sectionPlace, { backgroundColor: "#165bdc", duration: 2 });
    },
    onEnterBack: () => {
      // scrollBar.scrollTo(0, 3300, 3000);
      gsap.to(cursor, { backgroundColor: "#09ac06", duration: 0.2 });
    },
  });
}

const text = new SplitType(sectionPlaceTitle);
const chars = document.querySelectorAll(".place-eat-culture .char");
chars.forEach((char) => {
  const textContent = char.textContent;
  char.innerHTML = `<div>${textContent}</div>`;
});

const introTitles = document.querySelectorAll(".place-eat-culture__intro span");
introTitles.forEach((title) => {
  const splitTit = new SplitType(title);

  splitTit.chars.forEach((char, idx) => {
    const textContent = char.textContent;
    char.innerHTML = `<div class="title">${textContent}</div>`;
    char.insertAdjacentHTML("afterbegin", `<div class="title-block"></div>`);
    char.style.zIndex = splitTit.chars.length - idx;
  });
});

const introTitBlocks = document.querySelectorAll(
  ".place-eat-culture__intro .char .title-block"
);
const introTitChars = document.querySelectorAll(
  ".place-eat-culture__intro .char .title"
);

gsap.to(introTitBlocks, {
  width: (idx, _) => {
    return introTitChars[idx].offsetWidth;
  },
  height: (idx, _) => {
    return introTitChars[idx].offsetHeight;
  },
  stagger: 0.01,
  onComplete: () => {
    gsap.to(introTitBlocks, {
      x: (_, target) => {
        return -target.offsetWidth;
      },
    });
  },
});
gsap.to(introTitChars, {
  x: (_, target) => {
    return -target.offsetWidth;
  },
  stagger: 0.01,
});

setWhatsOnSlide();
setWhatsOnTxt();
setHotKeyword();

const charH3 = document.querySelector(".place-eat-culture h3");
const charTxt = document.querySelectorAll(".place-eat-culture h3 .char div");
let sectionPlaceOffsetY;

ScrollTrigger.create({
  trigger: sectionPlace,
  start: "top 60%",
  onEnter: () => {
    scrollBar.addListener(({ offset }) => {
      sectionPlaceOffsetY = offset.y;
    });
    gsap.to(introTitChars, {
      x: 0,
      stagger: { each: 0.05, ease: "none" },
      ease: "Power3.inOut",
      onStart: () => {
        const windowHeight =
          document.querySelector("#scroll-container").offsetHeight;
        scrollBar.scrollTo(0, sectionPlaceOffsetY + windowHeight * 0.6, 2000);
      },
      onComplete: () => {
        const intro = document.querySelector(".place-eat-culture__intro");
        const category = document.querySelector(".place-eat-culture__category");
        const list = document.querySelector(".place-eat-culture__list");

        const tl = gsap.timeline();
        tl.to(introTitChars, { color: "#ffffff", duration: 2 })
          .to(introTitBlocks, { backgroundColor: "#165BDC", duration: 2 }, "<")
          .to(sectionPlace, { backgroundColor: "#165BDC", duration: 2 }, "<")
          .to(
            category,
            {
              onStart: () => (category.style.display = "flex"),
              opacity: 1,
              duration: 2,
            },
            "<"
          )
          .to(introTitChars, {
            x: (_, target) => {
              return -target.offsetWidth;
            },
            stagger: 0.01,
            onComplete: () => {
              intro.style.display = "none";
              charH3.style.display = "block";
            },
          })
          .fromTo(
            charTxt,
            {
              x: (idx, target) => {
                document.documentElement.style.setProperty(
                  `--charLeft${idx}`,
                  `${-target.offsetWidth + 10}px`
                );
                return -target.offsetWidth;
              },
            },
            {
              x: 0,
              stagger: 0.1,
              onStart: () => {
                list.style.display = "flex";
              },
            }
          )
          .to(list, { opacity: 1, duration: 2 });
      },
    });
  },
});

// ScrollTrigger.create({
//   trigger: sectionPlace,
//   start: "40% center",
//   end: "bottom center",
//   pin: false,
//   pinSpacing: false,
//   markers: true,
//   scrub: true,
//   id: "place",
//   onEnter: () => {
//     gsap.to(charTxt, {
//       x: 0,
//       stagger: { each: 0.1, ease: "none" },
//       ease: "Power3.inOut",
//     });
//   },
//   onLeave: () => {
//     gsap.to(charTxt, {
//       x: (_, target) => {
//         return -target.offsetWidth;
//       },
//       stagger: { each: 0.1, ease: "none" },
//       ease: "Power3.inOut",
//     });
//   },
//   onEnterBack: () => {
//     gsap.to(charTxt, {
//       x: 0,
//       stagger: { each: 0.1, ease: "none" },
//       ease: "Power3.inOut",
//     });
//   },
//   onLeaveBack: () => {
//     gsap.to(charTxt, {
//       x: (_, target) => {
//         return -target.offsetWidth;
//       },
//       stagger: { each: 0.1, ease: "none" },
//       ease: "Power3.inOut",
//     });
//   },
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
