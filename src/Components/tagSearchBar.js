import { isValid, getTags } from "./searchBar";

export function handleTagSearchBar(recipes) {
    const filtersWrapper = document.querySelectorAll(
        ".filters-wrapper .filter"
    );

    console.log(recipes[0]);

    filtersWrapper.forEach((filter) => {
        const tagCrossBtn = filter.querySelector(".tag-cross-btn");
        const tagSearchInput = filter.querySelector(".tag-search-input");
        const tagSearchBtn = filter.querySelector(".tag-search-btn");
        const list = filter.querySelectorAll(".list");

        tagSearchInput.addEventListener("input", () => {
            tagCrossBtn.classList.toggle(
                "tag-cross-visible",
                tagSearchInput.value.trim().length >= 1
            );

            if (tagSearchInput.value.trim().length === 0) {
                list.innerHTML = "";
                getTags(recipes);
            }

            if (isValid(tagSearchInput)) {
                let category = tagSearchInput.dataset.category;
                tagFilterByLetter(tagSearchInput, recipes, category);
            }
        });

        tagCrossBtn.addEventListener("click", (e) => {
            e.preventDefault();
            tagSearchInput.value = "";
            tagCrossBtn.classList.remove("tag-cross-visible");
            list.innerHTML = "";
            getTags(recipes);
        });

        tagSearchBtn.addEventListener("click", (e) => e.preventDefault());
    });
}

function tagFilterByLetter(search, recipes, category) {
    let filteredRecipes = [];
    const searchValue = search.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
        switch (category) {
            case "ingredients":
                let recipeMatches =
                recipes[i].name.toLowerCase().includes(searchValue);
                break;
            case "appliances":
                //include sur appliance
                break;
            case "ustensils":
                //include sur ustensils
                break;
        }
    }
}
