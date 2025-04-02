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

    searchField.addEventListener("input", async () => {
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
