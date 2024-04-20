const gnbMenu = document.querySelector(".gnb__menu-tab");
const gnbMenuTabs = Array.from(
  document.querySelectorAll(".gnb__menu-tab > .tab")
);
const gnbMenuContent = document.querySelector(".gnb__menu-content");
const gnbContentList = document.querySelectorAll(".contents-list");
const headerElements = [
  document.querySelector(".gnb__logo"),
  document.querySelector(".gnb__search"),
  document.querySelector(".spot-menu"),
];
let currentIdx = 0;

gnbMenuContent.style.setProperty("--content-height", 0);

function updateContentHeight(idx) {
  const contentHeight = gnbContentList[idx].scrollHeight + "px";
  gnbMenuContent.style.setProperty("--content-height", contentHeight);
  gnbContentList.forEach((list) => {
    list.classList.remove("--active");
  });
  gnbContentList[idx].classList.add("--active");
}

gnbMenu.addEventListener("mousemove", (e) => {
  currentIdx = gnbMenuTabs.indexOf(e.target.closest("li"));
  updateContentHeight(currentIdx);
});

gnbMenuContent.addEventListener("mouseleave", () => {
  gnbMenuContent.style.setProperty("--content-height", 0);
});

headerElements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    gnbMenuContent.style.setProperty("--content-height", 0);
  });
});
