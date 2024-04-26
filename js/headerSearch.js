const gnbArea = document.querySelector(".gnb");
const gnbMenuArea = document.querySelector(".gnb__menu-tab");
const searchBtn = document.querySelector(".gnb__search--right");
const searchBox = document.querySelector(".gnb__search-box");
const searchDialog = document.querySelector(".gnb__search-box .content");
const searchDimmed = searchBox.querySelector(".search-dimmed");
const searchArea = searchBox.querySelector(".search-area");
const searchWrap = searchBox.querySelector(".search-wrap");
const searchSelect = searchBox.querySelector(".search-select");
const searchTextInput = searchBox.querySelector(".search-input input");
let isSearchAniPlaying = false;
searchDialog.style.left = searchWrap.offsetLeft + "px";
window.addEventListener("resize", () => {
  searchDialog.style.left = searchWrap.offsetLeft + "px";
});

searchBtn.addEventListener("click", () => {
  if (!searchBtn.classList.contains("--active") && !isSearchAniPlaying) {
    isSearchAniPlaying = true;
    searchTextInput.value = "";
    searchBtn.classList.add("--active");
    searchBox.style.display = "block";
    gsap.to(gnbMenuArea, { opacity: 0, duration: 0.3 });
    gsap.to(gnbArea, { borderBottomWidth: 0, duration: 0.2 });
    gsap.to(searchArea, { height: 455, duration: 0.3 });
    gsap.to(searchDimmed, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        isSearchAniPlaying = false;
        gnbArea.style.borderBottom = `none`;
        gnbMenuArea.style.display = "none";
      },
    });
  } else if (searchBtn.classList.contains("--active") && !isSearchAniPlaying) {
    isSearchAniPlaying = true;
    gnbMenuArea.style.display = "flex";
    gnbArea.style.borderBottom = `0.1rem solid #ececec`;
    gsap.to(searchArea, {
      height: 0,
      duration: 0.3,
      onComplete: () => {
        searchBox.style.display = "none";
        searchBtn.classList.remove("--active");
        isSearchAniPlaying = false;
      },
    });
    gsap.to(searchDimmed, {
      opacity: 0,
      duration: 0,
    });
    gsap.to(gnbMenuArea, { opacity: 1, duration: 0.3 });
    gsap.to(gnbArea, { borderBottomWidth: 0.1, duration: 0.2 });
  }
});

const fetchSearchDialogData = () => {
  fetch("../data/branchInfo.json")
    .then((res) => res.json())
    .then((data) => {
      const branchData = data;

      const contentWrap = searchDialog.querySelector(".content-wrap");
      const contentTitleArea = searchDialog.querySelector(
        ".content-title-wrap"
      );
      const contentList = searchDialog.querySelectorAll(".content-list");
      let isDialogOpen = false;

      const generateSubBranchHTML = (branches) => {
        return branches
          .map(
            (branch) => `<li>
            <a class="sub-list" href="javascript:void(0)">${branch}</a>
          </li>`
          )
          .join("");
      };
      const generateSubCategoryHTML = (subCategories) => {
        const subBranchesHTML = [];
        for (const subCategory in subCategories) {
          const branches = subCategories[subCategory];
          const subBranches = Array.isArray(branches)
            ? generateSubBranchHTML(branches)
            : generateSubCategoryHTML(branches);
          subBranchesHTML.push(`<li>
            <a class="sub-title" href="javascript:void(0)">${subCategory}</a>
            <ul>${subBranches}</ul>
          </li>`);
        }
        return subBranchesHTML.join("");
      };

      for (const category in branchData) {
        contentTitleArea.insertAdjacentHTML(
          "beforeend",
          `<li>
            <a href="javascript:void(0)" class="content-title ${
              category === "백화점" ? "--active" : ""
            }">
              ${category}
            </a>
          </li>`
        );

        const subCategories = branchData[category];
        const subBranchesHTML = Array.isArray(subCategories)
          ? generateSubBranchHTML(subCategories)
          : generateSubCategoryHTML(subCategories);

        const listIndex =
          category === "백화점" ? 0 : category === "아울렛" ? 1 : 2;
        contentList[listIndex].insertAdjacentHTML("beforeend", subBranchesHTML);
      }

      window.addEventListener("click", (e) => {
        if (!isDialogOpen && e.target === searchDimmed) {
          isSearchAniPlaying = true;
          gnbMenuArea.style.display = "flex";
          gnbArea.style.borderBottom = `0.1rem solid #ececec`;
          gsap.to(searchArea, {
            height: 0,
            duration: 0.3,
            onComplete: () => {
              searchBox.style.display = "none";
              searchBtn.classList.remove("--active");
              isSearchAniPlaying = false;
            },
          });
          gsap.to(searchDimmed, {
            opacity: 0,
            duration: 0,
          });
          gsap.to(gnbMenuArea, { opacity: 1, duration: 0.3 });
          gsap.to(gnbArea, { borderBottomWidth: 0.1, duration: 0.2 });
        }
        if (
          isDialogOpen &&
          !e.target.closest("div").classList.contains("content-wrap")
        ) {
          gsap.to(searchDialog, {
            width: 0,
            height: 0,
            duration: 0.3,
            onComplete: () => {
              isDialogOpen = false;
              searchDialog.open = false;
              searchSelect.classList.remove("--active");
            },
          });
        }
      });

      searchSelect.addEventListener("click", () => {
        const selectTxt = searchSelect.querySelectorAll("span");
        const subList = searchDialog.querySelectorAll(".sub-list");
        subList.forEach((list) => {
          list.parentElement.addEventListener("click", () => {
            if (
              list.parentElement.parentElement.previousElementSibling
                .tagName === "A"
            ) {
              subList.forEach((list) => {
                list.parentElement.style.backgroundColor = "#f6f6f6";
              });
              selectTxt[0].textContent =
                list.parentElement.parentElement.previousElementSibling.textContent;
              selectTxt[1].textContent = list.textContent;
              list.parentElement.style.backgroundColor = "#e0f55c";
              gsap.to(searchDialog, {
                width: 0,
                height: 0,
                duration: 0,
                onComplete: () => {
                  searchSelect.classList.remove("--active");
                  isDialogOpen = false;
                  searchDialog.open = false;
                },
              });
            } else {
              subList.forEach((list) => {
                list.parentElement.style.backgroundColor = "#f6f6f6";
              });
              selectTxt[0].textContent = "쇼핑몰";
              selectTxt[1].textContent = list.textContent;
              list.parentElement.style.backgroundColor = "#e0f55c";
              gsap.to(searchDialog, {
                width: 0,
                height: 0,
                duration: 0,
                onComplete: () => {
                  searchSelect.classList.remove("--active");
                  isDialogOpen = false;
                  searchDialog.open = false;
                },
              });
            }
          });
          if (selectTxt[1].textContent === list.textContent) {
            list.parentElement.style.backgroundColor = "#e0f55c";
          }
        });
        if (
          !searchDialog.open &&
          !searchSelect.classList.contains("--active")
        ) {
          searchSelect.classList.add("--active");
          searchDialog.open = true;
          gsap.to(searchDialog, {
            width: 675,
            height: getComputedStyle(contentWrap).getPropertyValue("height"),
            duration: 0.3,
            onComplete: () => {
              isDialogOpen = true;
            },
          });
        } else {
          gsap.to(searchDialog, {
            width: 0,
            height: 0,
            duration: 0.3,
            onComplete: () => {
              searchSelect.classList.remove("--active");
              isDialogOpen = false;
              searchDialog.open = false;
            },
          });
        }
      });

      const contentTabs = contentWrap.querySelectorAll(
        ".content-title-wrap > li a"
      );
      contentTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          contentTabs.forEach((tab) => tab.classList.remove("--active"));
          contentList.forEach((tab) => tab.classList.remove("--active"));
          tab.classList.add("--active");
          contentList[index].classList.add("--active");
          gsap.to(searchDialog, {
            height: getComputedStyle(contentWrap).getPropertyValue("height"),
            duration: 0.3,
          });
        });
      });
    });
};

window.addEventListener("load", fetchSearchDialogData);
