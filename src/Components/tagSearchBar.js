import { isValid, getTags } from "./searchBar";
import { Tag } from "../Models/Tag";

export function handleTagSearchBar(recipes) {
    const filtersWrapper = document.querySelectorAll(
        ".filters-wrapper .filter"
    );

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
    let filteredTags = new Set([]);
    const searchValue = search.value.toLowerCase();

    switch (category) {
        case "ingredients":
            filteredTags = new Set([]);
            recipes.forEach((el) => {
                el.ingredients.forEach((el) => {
                    if (el.ingredient.toLowerCase().includes(searchValue)) {
                        filteredTags.add(el.ingredient);
                    }
                });
            });
            createTags(filteredTags, "ingredients");
            break;
        case "appliances":
            filteredTags = new Set();
            recipes.forEach((el) => {
                if (el.appliance.toLowerCase().includes(searchValue)) {
                    filteredTags.add(el.appliance);
                }
            });
            createTags(filteredTags, "appliances");
            break;
        case "ustensils":
            filteredTags = new Set([]);
            recipes.forEach((el) => {
                el.ustensils.forEach((ustensil) => {
                    if (ustensil.toLowerCase().includes(searchValue)) {
                        filteredTags.add(ustensil);
                    }
                });
            });
            createTags(filteredTags, "ustensils");
            break;
    }
}

function createTags(filteredTags, category) {
    const ingredientsContainer = document.querySelector(".ingredients-list");
    const ustensilsContainer = document.querySelector(".ustensils-list");
    const appliancesContainer = document.querySelector(".appliances-list");
    let currentCategory = "";

    switch (category) {
        case "ingredients":
            currentCategory = ingredientsContainer;
            break;
        case "appliances":
            currentCategory = appliancesContainer;
            break;
        case "ustensils":
            currentCategory = ustensilsContainer;
            break;
    }

    currentCategory.innerHTML = "";

    filteredTags.forEach((el) => {
        let tagTemplate = new Tag(el);
        currentCategory.appendChild(tagTemplate.displayTag());
    });
}
