import { isValid } from "./searchBar";

export function handleTagSearchBar() {
    const tagCrossBtn = document.querySelector(".tag-cross-btn");
    const tagSearchInput = document.querySelector(".tag-search-input");
    const tagSearchBtn = document.querySelector(".tag-search-btn");
    const list = document.querySelectorAll(".list"); 

    tagSearchInput.addEventListener("input", () => {
        tagCrossBtn.classList.toggle(
            "tag-cross-visible",
            tagSearchInput.value.trim().length >= 1
        );

        if (tagSearchInput.value.trim().length === 0) {
            list.forEach((el) => (el.innerHTML = ""));
            //displayRecipes(recipes);
        }

        if (isValid(tagSearchInput)) {
            //filterByLetter(tagSearchInput.value.toLowerCase(), recipes);
        }
    });

    tagCrossBtn.addEventListener("click", (e) => {
        e.preventDefault();
        tagSearchInput.value = "";
        tagCrossBtn.classList.remove("cross-visible");
        //recipesWrapper.innerHTML = "";
        //displayRecipes(recipes);
    });

    tagSearchBtn.addEventListener("click", (e) => e.preventDefault());
}

function tagFilterByLetter(search, recipes) {
    let filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].) {
            
        }
        }
}
