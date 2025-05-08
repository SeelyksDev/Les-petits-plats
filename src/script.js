import { Recipe } from "./Models/Recipe";
import { handleSearchBar, getTags } from "./Components/searchBar";

export async function getRecipes() {
    try {
        const url = "recipes.json";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`reponse : ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
    }
}

export function displayRecipes(recipes) {
    const numberRecipes = document.querySelector(".number-recipes");
    const recipesWrapper = document.querySelector(".recipes-wrapper");

    recipesWrapper.innerHTML = "";

    recipes.forEach((rec) => {
        const recipesTemplate = new Recipe(rec);
        recipesWrapper.appendChild(recipesTemplate.getNewRecipeDOM());
    });

    numberRecipes.textContent = `${recipes.length} recettes`;
    getTags(recipes);
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
    handleSearchBar();
}

init();
