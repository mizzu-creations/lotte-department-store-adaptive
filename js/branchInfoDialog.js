const fetchDataAndRunCode = () => {
  fetch("../data/branchInfo.json")
    .then((res) => res.json())
    .then((data) => {
      const branchData = data;

      const branchAnimation = document.querySelector(".branch-info-ani");
      const branchDialog = document.querySelector(
        ".gnb__search--left .content"
      );
      const disabledArea = document.querySelector(
        ".gnb__branchinfo-background"
      );
      const contentWrap = document.querySelector("dialog .content-wrap");
      const contentTitleArea = document.querySelector(".content-title-wrap");
      const contentList = contentWrap.querySelectorAll(".content-list");
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
        if (
          isDialogOpen &&
          !e.target.closest("div").classList.contains("content-wrap")
        ) {
          gsap.to(branchDialog, {
            width: 0,
            height: 0,
            duration: 0.3,
            onComplete: () => {
              isDialogOpen = false;
              branchDialog.open = false;
              disabledArea.style.display = "none";
            },
          });
        }
      });
      branchAnimation.addEventListener("click", () => {
        if (!branchDialog.open && !searchBtn.classList.contains("--active")) {
          disabledArea.style.display = "block";
          branchDialog.open = true;
          gsap.to(branchDialog, {
            width: 675,
            height: 514,
            duration: 0.3,
            onComplete: () => {
              isDialogOpen = true;
            },
          });
        } else {
          gsap.to(branchDialog, {
            width: 0,
            height: 0,
            duration: 0.3,
            onComplete: () => {
              isDialogOpen = false;
              branchDialog.open = false;
              disabledArea.style.display = "none";
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
          gsap.to(branchDialog, {
            height: getComputedStyle(contentWrap).getPropertyValue("height"),
            duration: 0.3,
          });
        });
      });
    });
};

window.addEventListener("load", fetchDataAndRunCode);
