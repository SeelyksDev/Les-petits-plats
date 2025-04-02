import { displayRecipes, getRecipes } from "../script";
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

function isValid(search) {
    if (search.value.trim().length >= 3) {
        return true;
    } else {
        return false;
    }
}

export function filterByLetter(search, recipes) {
    let filteredRecipes = [];
    const searchValue = search.value.toLowerCase();

    for (let i = 0; i < recipes.length; i++) {
        let recipeMatches =
            recipes[i].name.toLowerCase().includes(searchValue) ||
            recipes[i].description.toLowerCase().includes(searchValue);

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchValue)) {
                recipeMatches = true;
                break;
            }
        }

        if (recipeMatches) {
            filteredRecipes.push(recipes[i]);
        }
    }

    if (filteredRecipes.length === 0) {
        displayNoContentMsg(search);
    } else {
        recipesWrapper.innerHTML = "";
        displayRecipes(filteredRecipes);
    }
}

function displayNoContentMsg(search) {
    recipesWrapper.innerHTML = "";

    const p = document.createElement("p");
    p.classList.add("no-content-msg");
    p.textContent = `Aucune recette ne contient
        « ${search.value} »  vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipesWrapper.appendChild(p);

    const numberRecipes = document.querySelector(".number-recipes");
    numberRecipes.textContent = "0 recettes";
}
