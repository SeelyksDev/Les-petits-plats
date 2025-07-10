import { Recipe } from "./Models/Recipe.js";
import { handleSearchBar, getTags } from "./Components/searchBar";
import { TagManager } from "./Models/TagManager";

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

    recipesWrapper.textContent = "";

    recipes.forEach((rec) => {
        const recipesTemplate = new Recipe(rec);
        recipesWrapper.appendChild(recipesTemplate.getNewRecipeDOM());
    });

    numberRecipes.textContent = `${recipes.length
        .toString()
        .padStart(2, "0")} recettes`;
    getTags(recipes);
}

async function init() {
    const recipes = await getRecipes();

    TagManager.setOriginalRecipes(recipes);

    displayRecipes(recipes);
    handleSearchBar();
}

init();
