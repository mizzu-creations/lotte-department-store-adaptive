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

function addActive(element) {
  element.classList.add("--active");
}
function removeAllActive(elements) {
  elements.forEach((elem) => elem.classList.remove("--active"));
}
function setContentHeight(height) {
  gnbMenuContent.style.setProperty("--content-height", height);
}
function closeContent() {
  removeAllActive(gnbMenuTabs);
  setContentHeight(0);
}
function updateContentHeight(idx) {
  const contentHeight = `${gnbContentList[idx].scrollHeight}px`;
  setContentHeight(contentHeight);
  removeAllActive(gnbContentList);
  addActive(gnbContentList[idx]);
}

function init() {
  gnbMenu.addEventListener("mousemove", (e) => {
    removeAllActive(gnbMenuTabs);
    addActive(e.target.closest("li"));
    currentIdx = gnbMenuTabs.indexOf(e.target.closest("li"));
    updateContentHeight(currentIdx);
  });
  gnbMenuContent.addEventListener("mouseleave", closeContent);
  headerElements.forEach((element) => {
    element.addEventListener("mouseover", closeContent);
  });
  window.addEventListener("load", () =>
    gnbMenuContent.style.setProperty("--content-height", 0)
  );
}

init();

gnbContentList.forEach((list) => {
  const id = list.getAttribute("id");
  if (id === "branch-information" || id === "shopping-information") {
    const subMenuTabs = list.querySelectorAll(".contents-list__tab .underline");
    const subMenuLists = list.querySelectorAll(".contents-list__menu");

    subMenuTabs.forEach((tab, i) => {
      tab.addEventListener("mouseover", () => {
        removeAllActive(subMenuTabs);
        removeAllActive(subMenuLists);
        addActive(tab);
        addActive(subMenuLists[i]);
        setContentHeight(`${subMenuLists[i].scrollHeight}px`);
      });
    });

    list.addEventListener("mouseleave", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const elementAtMouse = document.elementFromPoint(mouseX, mouseY);

      function handleMouseLeave() {
        removeAllActive(subMenuTabs);
        removeAllActive(subMenuLists);
        addActive(subMenuTabs[0]);
        addActive(subMenuLists[0]);
      }

      if (
        elementAtMouse.tagName === "A" ||
        elementAtMouse.tagName === "LI" ||
        elementAtMouse.tagName === "NAV"
      ) {
        handleMouseLeave();
      } else {
        setTimeout(() => {
          handleMouseLeave();
        }, 300);
      }
    });
  }
});
