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

    if (isValid(search)) {
        let sortedRecipes = recipes.filter((el) => {
            return (
                el.name.includes(search.value) ||
                el.description.includes(search.value) ||
                el.ingredients.some((ingr) =>
                    ingr.ingredient.includes(search.value)
                )
            );
        });

        recipesWrapper.innerHTML = "";
        sortedRecipes.forEach((recipe) => {
            const filteredRecipeTemplate = new Recipe(recipe);
            recipesWrapper.appendChild(
                filteredRecipeTemplate.getNewRecipeDOM()
            );
        });
    } else {
        recipesWrapper.innerHTML = "";
        displayRecipes(recipes);
    }
}
