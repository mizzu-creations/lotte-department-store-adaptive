function branchInfoAni() {
  const branchInfo = document.querySelector(".branch-info-ani > div");
  const childWidth = branchInfo.querySelector("span").offsetWidth;
  gsap.to(branchInfo, {
    duration: 4,
    x: `-${childWidth + 5}`,
    repeat: -1,
    ease: "none",
  });
}
function moreNewsAni() {
  const moreNews = document.querySelector(".more-news img");
  gsap.to(moreNews, {
    duration: 13,
    rotation: 360,
    repeat: -1,
    ease: "none",
  });
}
function followInstaGalleryAni() {
  const gallery = document.querySelector(".follow-instagram__gallery");
  const galleryTop = gallery.querySelector(".gallery__top");
  const galleryBottom = gallery.querySelector(".gallery__bottom");
  const galleryWidth = galleryTop.querySelector("ul").offsetWidth;
  const galleryGap = parseFloat(
    window.getComputedStyle(gallery).getPropertyValue("gap")
  );

  const topTl = gsap.timeline().to(galleryTop, {
    x: -galleryWidth - galleryGap,
    repeat: -1,
    duration: 20,
    ease: "none",
  });
  const bottomTl = gsap.timeline().to(galleryBottom, {
    x: galleryWidth + galleryGap,
    repeat: -1,
    duration: 20,
    ease: "none",
  });

  topTl.play();
  bottomTl.play();

  gallery.addEventListener("mouseover", () => {
    gsap.to(topTl, { timeScale: 0, duration: 0.5 });
    gsap.to(bottomTl, { timeScale: 0, duration: 0.5 });
  });
  gallery.addEventListener("mouseleave", () => {
    gsap.to(topTl, { timeScale: 1, duration: 0.5 });
    gsap.to(bottomTl, { timeScale: 1, duration: 0.5 });
  });
}
function allContents() {
  const btns = document.querySelectorAll(".all-contents");

  btns.forEach((btn) => {
    const isDark = btn.classList.contains("dark");

    btn.addEventListener("mouseover", () => {
      gsap.to(btn.children[0], {
        color: isDark ? "#000000" : "#ffffff",
        duration: 0.4,
      });
      gsap.to(btn.children[1], { yPercent: -50, scale: 3, duration: 0.4 });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn.children[0], {
        color: isDark ? "#ffffff" : "#000000",
        duration: 0.4,
      });
      gsap.to(btn.children[1], { yPercent: 0, scale: 0, duration: 0.4 });
    });
  });
}

window.addEventListener("load", () => {
  branchInfoAni();
  moreNewsAni();
  followInstaGalleryAni();
  allContents();
});
