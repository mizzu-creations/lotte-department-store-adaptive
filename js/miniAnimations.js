function branchInfoAni() {
  const branchInfo = document.querySelector(".branch-info-ani > div");
  gsap.to(branchInfo, { duration: 4, x: -184, repeat: -1, ease: "none" });
}

window.addEventListener("load", () => {
  branchInfoAni();
});
