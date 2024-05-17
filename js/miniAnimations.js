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
  const topTl = gsap.timeline().to(galleryTop, {
    x: -galleryWidth,
    repeat: -1,
    duration: 20,
    ease: "none",
  });
  const bottomTl = gsap.timeline().to(galleryBottom, {
    x: galleryWidth,
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

window.addEventListener("load", () => {
  branchInfoAni();
  moreNewsAni();
  followInstaGalleryAni();
});
