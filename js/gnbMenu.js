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
  gnbMenuTabs.forEach((tab) => tab.classList.remove("--active"));
  e.target.closest("li").classList.add("--active");
  currentIdx = gnbMenuTabs.indexOf(e.target.closest("li"));
  updateContentHeight(currentIdx);
});

gnbMenuContent.addEventListener("mouseleave", () => {
  gnbMenuTabs.forEach((tab) => tab.classList.remove("--active"));
  gnbMenuContent.style.setProperty("--content-height", 0);
});

headerElements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    gnbMenuTabs.forEach((tab) => tab.classList.remove("--active"));
    gnbMenuContent.style.setProperty("--content-height", 0);
  });
});

const subMenuTabs = document.querySelectorAll(".contents-list__tab > li span");
const subMenuLists = document.querySelectorAll(".contents-list__menu");

subMenuTabs.forEach((tab, i) => {
  tab.addEventListener("mouseover", () => {
    subMenuTabs.forEach((tab) => tab.classList.remove("--active"));
    subMenuLists.forEach((tab) => tab.classList.remove("--active"));
    tab.classList.add("--active");
    subMenuLists[i].classList.add("--active");
    gnbMenuContent.style.setProperty(
      "--content-height",
      subMenuLists[i].scrollHeight + "px"
    );
  });
});
