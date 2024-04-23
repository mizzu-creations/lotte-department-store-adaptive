const langBtn = document.querySelector(".lang-btn");
const langDialog = document.querySelector(".lang");

langBtn.addEventListener("mouseover", () => {
  langDialog.open = true;
});
langDialog.addEventListener("mouseleave", () => {
  langDialog.open = false;
});

window.addEventListener("mousemove", (e) => {
  if (langDialog.open) {
    if (
      e.target === langDialog ||
      e.target === langBtn ||
      e.target.alt === "한국어" ||
      e.target.classList.contains("spot-menu") ||
      e.target.classList.contains("lang-wrap") ||
      e.target.tagName === "SPAN"
    ) {
      langDialog.open = true;
    } else {
      langDialog.open = false;
    }
  }
});
