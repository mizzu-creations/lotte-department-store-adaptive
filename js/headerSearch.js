const gnbArea = document.querySelector(".gnb");
const gnbMenuArea = document.querySelector(".gnb__menu-tab");
const searchBtn = document.querySelector(".gnb__search--right");
const searchBox = document.querySelector(".gnb__search-box");
const searchDimmed = searchBox.querySelector(".search-dimmed");
const searchArea = searchBox.querySelector(".search-area");

searchBtn.addEventListener("click", () => {
  // 모든 Tween 취소 및 무시
  gsap.killTweensOf(gnbMenuArea);
  gsap.killTweensOf(gnbArea);
  gsap.killTweensOf(searchBox);
  gsap.killTweensOf(searchArea);
  gsap.killTweensOf(searchDimmed);

  if (!searchBtn.classList.contains("--active")) {
    searchBtn.classList.add("--active");
    searchBox.style.display = "block";
    gsap.to(gnbMenuArea, { opacity: 0, duration: 0.3 });
    gsap.to(gnbArea, { borderBottomWidth: 0, duration: 0.3 });
    gsap.to(searchBox, { opacity: 1, duration: 0.3 });
    gsap.to(searchArea, { height: 455, duration: 0.2 });
    gsap.to(searchDimmed, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        gnbArea.style.borderBottom = `none`;
        gnbMenuArea.style.display = "none";
      },
    });
  } else {
    gnbMenuArea.style.display = "flex";
    gnbArea.style.borderBottom = `0.1rem solid #ececec`;

    gsap.to(searchBox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        searchBox.style.display = "none";
        searchBtn.classList.remove("--active");
        gsap.to(gnbMenuArea, { opacity: 1, duration: 0.3 });
        gsap.to(gnbArea, { borderBottomWidth: 0.1, duration: 0.3 });
      },
    });
    gsap.to(searchArea, { height: 0, duration: 0.3 });
    gsap.to(searchDimmed, {
      opacity: 0,
      duration: 0,
    });
  }
});
