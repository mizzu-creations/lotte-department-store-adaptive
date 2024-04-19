function setWidthHeight() {
  const uw = window.innerWidth / 100;
  const uh = window.innerHeight / 100;

  document.documentElement.style.setProperty("--uw", `${uw}px`);
  document.documentElement.style.setProperty("--uh", `${uh}px`);
}
window.addEventListener("load", setWidthHeight);
window.addEventListener("resize", setWidthHeight);
