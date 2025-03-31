import { Recipe } from "../Models/Recipe";
import { displayRecipes, getRecipes } from "../script";

export function handleSearchBar() {
    const crossBtn = document.querySelector(".cross-btn");
    const searchField = document.querySelector(".search-field");

    searchField.addEventListener("input", async () => {
        crossBtn.classList.toggle(
            "cross-visible",
            searchField.value.trim().length >= 1
        );
        const recipes = await getRecipes();

        filterByLetter(searchField, recipes);
    });

    crossBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchField.value = "";
        crossBtn.classList.remove("cross-visible");
    });
}

export function isValid(search) {
    if (search.value.trim().length >= 3) {
        return true;
    } else {
        return false;
    }
}

export function filterByLetter(search, recipes) {
    const recipesWrapper = document.querySelector(".recipes-wrapper");
    let filteredRecipes = [];

    if (isValid(search)) {
        for (let i = 0; i < recipes.length; i++) {
            let recipeMatches =
                recipes[i].name.includes(search.value) ||
                recipes[i].description.includes(search.value);

            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if (
                    recipes[i].ingredients[j].ingredient.includes(search.value)
                ) {
                    recipeMatches = true;
                    break;
                }
            }

            if (recipeMatches) {
                filteredRecipes.push(recipes[i]);
            }
        }

        recipesWrapper.innerHTML = "";

        for (let i = 0; i < filteredRecipes.length; i++) {
            displayRecipes(filteredRecipes[i]);
        }
    } else {
        recipesWrapper.innerHTML = "";
        displayRecipes(recipes);
    }
}
