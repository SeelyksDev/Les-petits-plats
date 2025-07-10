import { displayRecipes, getRecipes } from "../script";
import { handleTagSearchBar } from '../Components/tagSearchBar.js';
import { Tag } from "../Models/Tag.js";
const recipesWrapper = document.querySelector(".recipes-wrapper");

async function loadRecipes() {
    let allRecipes = await getRecipes();
    return allRecipes;
}

export async function handleSearchBar() {
    const crossBtn = document.querySelector(".cross-btn");
    const searchField = document.querySelector(".search-field");
    const searchBtn = document.querySelector(".search-btn");
    const recipes = await loadRecipes();

    searchField.addEventListener("input", async () => {
        crossBtn.classList.toggle(
            "cross-visible",
            searchField.value.trim().length >= 1
        );

        if (searchField.value.trim().length === 0) {
            recipesWrapper.textContent = "";
            displayRecipes(recipes);
        }

        if (isValid(searchField)) {
            filterByLetter(searchField, recipes);
        }
    });

    crossBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchField.value = "";
        crossBtn.classList.remove("cross-visible");
        recipesWrapper.textContent = "";
        displayRecipes(recipes);
    });

    searchBtn.addEventListener("click", (e) => e.preventDefault());
}

function isValid(search) {
    if (search.value.trim().length >= 3) {
        return true;
    } else {
        return false;
    }
}

export function filterByLetter(search, recipes) {
    const recipesWrapper = document.querySelector(".recipes-wrapper");
    const searchValue = search.value.toLowerCase();

    let filteredRecipes = recipes.filter((el) => {
        return (
            el.name.toLowerCase().includes(searchValue) ||
            el.description.toLowerCase().includes(searchValue) ||
            el.ingredients.some((ingr) =>
                ingr.ingredient.toLowerCase().includes(searchValue)
            )
        );
    });

    if (filteredRecipes.length === 0) {
        displayNoContentMsg(search.value);
    } else {
        recipesWrapper.textContent = "";
        displayRecipes(filteredRecipes);
        getTags(filteredRecipes);
    }
}

function displayNoContentMsg(search) {
    recipesWrapper.textContent = "";

    const p = document.createElement("p");
    p.classList.add("no-content-msg");
    p.textContent = `Aucune recette ne contient « ${search} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    
    recipesWrapper.appendChild(p);

    const numberRecipes = document.querySelector(".number-recipes");
    numberRecipes.textContent = "0 recettes";
}

export function getTags(recipes) {
    const ingredientsContainer = document.querySelector(".ingredients-list");
    const ustensilsContainer = document.querySelector(".ustensils-list");
    const appliancesContainer = document.querySelector(".appliances-list");
    const list = document.querySelectorAll(".list");

    list.forEach((el) => (el.textContent = ""));

    let ingredients = new Set();
    let ustensils = new Set();
    let appliances = new Set();

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((current) =>
            ingredients.add(current.ingredient.toLowerCase())
        );
        recipe.ustensils.forEach((current) => ustensils.add(current));
        appliances.add(recipe.appliance);
    });

    ingredients.forEach((currentIngr) => {
        let tagTemplate = new Tag(currentIngr, recipes);
        ingredientsContainer.appendChild(tagTemplate.displayTag());
    });
    ustensils.forEach((currentUstensil) => {
        let tagTemplate = new Tag(currentUstensil, recipes);
        ustensilsContainer.appendChild(tagTemplate.displayTag());
    });
    appliances.forEach((currentApplicance) => {
        let tagTemplate = new Tag(currentApplicance, recipes);
        appliancesContainer.appendChild(tagTemplate.displayTag());
    });

    handleTagSearchBar(recipes);
}