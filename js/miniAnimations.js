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

window.addEventListener("load", () => {
  branchInfoAni();
  moreNewsAni();
});
