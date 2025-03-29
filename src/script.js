import { Recipe } from "./Models/Recipe";
import { handleSearchBar } from "./Components/searchBar";

async function getRecipes() {
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

function displayRecipes(recipes) {
    const recipesWrapper = document.querySelector(".recipes-wrapper");
    recipes.forEach((rec) => {
        const recipesTemplate = new Recipe(rec);
        recipesWrapper.appendChild(recipesTemplate.getNewRecipeDOM());
    });
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
    handleSearchBar();
}

init();


