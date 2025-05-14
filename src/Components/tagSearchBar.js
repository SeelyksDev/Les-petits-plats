import { isValid } from "./searchBar";
import { Tag } from "../Models/Tag";
const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

export function handleTagSearchBar(recipes) {
    const filtersWrapper = document.querySelectorAll(
        ".filters-wrapper .filter"
    );

    filtersWrapper.forEach((filter) => {
        const tagCrossBtn = filter.querySelector(".tag-cross-btn");
        const tagSearchInput = filter.querySelector(".tag-search-input");
        const tagSearchBtn = filter.querySelector(".tag-search-btn");
        let category = tagSearchInput.dataset.category;

        tagSearchInput.addEventListener("input", () => {
            tagCrossBtn.classList.toggle(
                "tag-cross-visible",
                tagSearchInput.value.trim().length >= 1
            );

            if (tagSearchInput.value.trim().length === 0) {
                refreshTags(recipes, category);
            }

            if (isValid(tagSearchInput)) {
                tagFilterByLetter(tagSearchInput, recipes, category);
            }
        });

        tagCrossBtn.addEventListener("click", (e) => {
            e.preventDefault();
            tagSearchInput.value = "";
            tagCrossBtn.classList.remove("tag-cross-visible");
            refreshTags(recipes, category);
        });

        tagSearchBtn.addEventListener("click", (e) => e.preventDefault());
    });
}

function tagFilterByLetter(search, recipes, category) {
    let filteredTags = new Set();
    const searchValue = search.value.toLowerCase();

    switch (category) {
        case "ingredients":
            filteredTags = new Set();
            recipes.forEach((el) => {
                el.ingredients.forEach((el) => {
                    if (el.ingredient.toLowerCase().includes(searchValue)) {
                        filteredTags.add(el.ingredient);
                    }
                });
            });
            createTags(filteredTags, "ingredients", recipes);
            break;
        case "appliances":
            filteredTags = new Set();
            recipes.forEach((el) => {
                if (el.appliance.toLowerCase().includes(searchValue)) {
                    filteredTags.add(el.appliance);
                }
            });
            createTags(filteredTags, "appliances", recipes);
            break;
        case "ustensils":
            filteredTags = new Set();
            recipes.forEach((el) => {
                el.ustensils.forEach((ustensil) => {
                    if (ustensil.toLowerCase().includes(searchValue)) {
                        filteredTags.add(ustensil);
                    }
                });
            });
            createTags(filteredTags, "ustensils", recipes);
            break;
    }
}

function createTags(filteredTags, category, recipes) {
    let tagsArray = [...filteredTags];
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

    if (tagsArray.length === 0) {
        let span = document.createElement("p");
        span.classList.add("tag-error-msg");
        span.textContent = "Aucun filtre ne correspond à votre recherche.";
        currentCategory.appendChild(span);
    } else {

        tagsArray.forEach((el) => {
            let tagTemplate = new Tag(el, recipes);
            currentCategory.appendChild(tagTemplate.displayTag());
        });
    }
}

function refreshTags(recipes, category) {
    switch (category) {
        case "ingredients":
            ingredientsContainer.innerHTML = "";
            let ingredients = new Set();
            recipes.forEach((recipe) => {
                recipe.ingredients.forEach((current) =>
                    ingredients.add(current.ingredient.toLowerCase())
                );
            });

            ingredients.forEach((currentIngr) => {
                let tagTemplate = new Tag(currentIngr);
                ingredientsContainer.appendChild(tagTemplate.displayTag());
            });
            break;

        case "appliances":
            appliancesContainer.innerHTML = "";
            let appliances = new Set();
            recipes.forEach((recipe) => appliances.add(recipe.appliance));

            appliances.forEach((currentApplicance) => {
                let tagTemplate = new Tag(currentApplicance);
                appliancesContainer.appendChild(tagTemplate.displayTag());
            });
            break;

        case "ustensils":
            ustensilsContainer.innerHTML = "";
            let ustensils = new Set();
            recipes.forEach((recipe) =>
                recipe.ustensils.forEach((current) => ustensils.add(current))
            );

            ustensils.forEach((currentUstensil) => {
                let tagTemplate = new Tag(currentUstensil);
                ustensilsContainer.appendChild(tagTemplate.displayTag());
            });
            break;
    }
}
