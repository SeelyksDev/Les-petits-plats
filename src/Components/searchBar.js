import { displayRecipes, getRecipes } from "../script";
import { Tag } from "../Models/Tag";
import { handleTagSearchBar } from "./tagSearchBar";
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

    searchField.addEventListener("input", () => {
        crossBtn.classList.toggle(
            "cross-visible",
            searchField.value.trim().length >= 1
        );

        if (searchField.value.trim().length === 0) {
            recipesWrapper.innerHTML = "";
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
        recipesWrapper.innerHTML = "";
        displayRecipes(recipes);
    });

    searchBtn.addEventListener("click", (e) => e.preventDefault());
}

export function isValid(search) {
    return search.value.trim().length >= 3;  
}

export function filterByLetter(search, recipes) {
    let filteredRecipes = [];
    const searchValue = search.value.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        let recipeMatches =
            recipes[i].name.toLowerCase().includes(searchValue) ||
            recipes[i].description.toLowerCase().includes(searchValue);

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (
                recipes[i].ingredients[j].ingredient
                    .toLowerCase()
                    .includes(searchValue)
            ) {
                recipeMatches = true;
                break;
            }
        }

        if (recipeMatches) {
            filteredRecipes.push(recipes[i]);
        }
    }

    if (filteredRecipes.length === 0) {
        displayNoContentMsg(search.value);
    } else {
        recipesWrapper.innerHTML = "";
        displayRecipes(filteredRecipes);
        getTags(filteredRecipes);
    }
}

function displayNoContentMsg(search) {
    recipesWrapper.innerHTML = "";

    const p = document.createElement("p");
    p.classList.add("no-content-msg");
    p.textContent = `Aucune recette ne contient
        « ${search} »  vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipesWrapper.appendChild(p);

    const numberRecipes = document.querySelector(".number-recipes");
    numberRecipes.textContent = "0 recettes";
}

export function getTags(recipes) {
    const ingredientsContainer = document.querySelector(".ingredients-list");
    const ustensilsContainer = document.querySelector(".ustensils-list");
    const appliancesContainer = document.querySelector(".appliances-list");
    const list = document.querySelectorAll(".list");
    
    list.forEach(el => el.innerHTML = "");

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
