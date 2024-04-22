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

window.addEventListener("load", () => {
  branchInfoAni();
});
