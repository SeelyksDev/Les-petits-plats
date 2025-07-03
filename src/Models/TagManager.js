// TagManager.js - Nouveau fichier pour gérer les filtres de manière centralisée

import { displayRecipes } from "../script";

const anchorsWrapper = document.querySelector(".tags-anchors-wrapper");
const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

let anchorsTopIngredientsWrapper = document.createElement("ul");
anchorsTopIngredientsWrapper.classList.add("top-anchor-wrapper");

let anchorsTopAppliancesWrapper = document.createElement("ul");
anchorsTopAppliancesWrapper.classList.add("top-anchor-wrapper");

let anchorsTopUstensilsWrapper = document.createElement("ul");
anchorsTopUstensilsWrapper.classList.add("top-anchor-wrapper");

let anchorObject = new Set();
let anchorsTopIngredients = new Set();
let anchorsTopAppliances = new Set();
let anchorsTopUstensils = new Set();

// Référence vers les recettes originales (sera définie depuis script.js)
let originalRecipes = [];

class TagManager {
    static setOriginalRecipes(recipes) {
        originalRecipes = recipes;
    }

    static addFilter(value, category) {
        if (!this.hasAnchor(value, category)) {
            anchorObject.add({ tagName: value, category: category });
        }
        this.displayTagAnchor();
        this.updateTopAnchors(value, category);
        this.applyAllFilters();
    }

    static removeFilter(value, category) {
        this.deleteAnchorObject(value);
        this.displayTagAnchor();
        this.removeFromTopAnchors(value, category);
        this.applyAllFilters();
    }

    static updateTopAnchors(value, category) {
        switch (category) {
            case "ingredients":
                anchorsTopIngredients.add(value);
                anchorsTopIngredientsWrapper.innerHTML = "";
                this.createTopAnchors(
                    ingredientsContainer,
                    anchorsTopIngredients,
                    anchorsTopIngredientsWrapper,
                    "ingredients"
                );
                break;
            case "appliances":
                anchorsTopAppliances.add(value);
                anchorsTopAppliancesWrapper.innerHTML = "";
                this.createTopAnchors(
                    appliancesContainer,
                    anchorsTopAppliances,
                    anchorsTopAppliancesWrapper,
                    "appliances"
                );
                break;
            case "ustensils":
                anchorsTopUstensils.add(value);
                anchorsTopUstensilsWrapper.innerHTML = "";
                this.createTopAnchors(
                    ustensilsContainer,
                    anchorsTopUstensils,
                    anchorsTopUstensilsWrapper,
                    "ustensils"
                );
                break;
        }
    }

    static removeFromTopAnchors(value, category) {
        switch (category) {
            case "ingredients":
                anchorsTopIngredients.delete(value);
                anchorsTopIngredientsWrapper.innerHTML = "";
                if (anchorsTopIngredients.size > 0) {
                    this.createTopAnchors(
                        ingredientsContainer,
                        anchorsTopIngredients,
                        anchorsTopIngredientsWrapper,
                        "ingredients"
                    );
                }
                break;
            case "appliances":
                anchorsTopAppliances.delete(value);
                anchorsTopAppliancesWrapper.innerHTML = "";
                if (anchorsTopAppliances.size > 0) {
                    this.createTopAnchors(
                        appliancesContainer,
                        anchorsTopAppliances,
                        anchorsTopAppliancesWrapper,
                        "appliances"
                    );
                }
                break;
            case "ustensils":
                anchorsTopUstensils.delete(value);
                anchorsTopUstensilsWrapper.innerHTML = "";
                if (anchorsTopUstensils.size > 0) {
                    this.createTopAnchors(
                        ustensilsContainer,
                        anchorsTopUstensils,
                        anchorsTopUstensilsWrapper,
                        "ustensils"
                    );
                }
                break;
        }
    }

    static applyAllFilters() {
        console.log("Applying filters with anchors:", Array.from(anchorObject));
        
        if (anchorObject.size === 0) {
            displayRecipes(originalRecipes);
            return;
        }

        let filteredRecipes = originalRecipes;
        const activeFilters = Array.from(anchorObject);

        // Séparer les filtres par catégorie
        const ingredientFilters = activeFilters
            .filter(filter => filter.category === "ingredients")
            .map(filter => filter.tagName.toLowerCase());
        
        const applianceFilters = activeFilters
            .filter(filter => filter.category === "appliances")
            .map(filter => filter.tagName.toLowerCase());
        
        const ustensilFilters = activeFilters
            .filter(filter => filter.category === "ustensils")
            .map(filter => filter.tagName.toLowerCase());

        // Appliquer les filtres d'ingrédients (ET logique)
        if (ingredientFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                ingredientFilters.every(ingredient => 
                    recipe.ingredients.some(recipeIngredient => 
                        recipeIngredient.ingredient.toLowerCase() === ingredient
                    )
                )
            );
        }

        // Appliquer les filtres d'appareils
        if (applianceFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                applianceFilters.includes(recipe.appliance.toLowerCase())
            );
        }

        // Appliquer les filtres d'ustensiles (ET logique)
        if (ustensilFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                ustensilFilters.every(ustensil => 
                    recipe.ustensils.some(recipeUstensil => 
                        recipeUstensil.toLowerCase() === ustensil
                    )
                )
            );
        }

        console.log("Filtered recipes:", filteredRecipes.length);
        displayRecipes(filteredRecipes);
    }

    static displayTagAnchor() {
        if (anchorObject.size === 0) {
            anchorsWrapper.classList.remove("display");
            anchorsWrapper.innerHTML = "";
            return;
        }

        anchorsWrapper.classList.add("display");
        anchorsWrapper.innerHTML = "";
        
        anchorObject.forEach((anchor) => {
            let li = document.createElement("li");
            li.classList.add("tag-anchor");
            li.setAttribute("data-value", anchor.tagName);
            li.setAttribute("data-category", anchor.category);
            li.innerHTML = `
                <span class="anchor-text">${
                    anchor.tagName[0].toUpperCase() +
                    anchor.tagName.slice(1).toLowerCase()
                }</span>
                <button class="anchor-cross-btn">
                    <img
                        src="/assets/icons/cross.svg"
                        alt="bouton croix"
                    />
                </button>
            `;
            anchorsWrapper.appendChild(li);
            this.handleCrossTagClick(li);
        });
    }

    static handleCrossTagClick(mainTagAnchor) {
        const mainTagAnchorValue = mainTagAnchor.dataset.value;
        const mainTagAnchorCategory = mainTagAnchor.dataset.category;
        let mainAnchorBtn = mainTagAnchor.querySelector(".anchor-cross-btn");

        mainAnchorBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Removing filter:", mainTagAnchorValue, mainTagAnchorCategory);
            this.removeFilter(mainTagAnchorValue, mainTagAnchorCategory);
        });
    }

    static deleteAnchorObject(value) {
        for (let item of anchorObject) {
            if (item.tagName === value) {
                anchorObject.delete(item);
                break;
            }
        }
    }

    static hasAnchor(value, category) {
        for (let item of anchorObject) {
            if (item.tagName === value && item.category === category) {
                return true;
            }
        }
        return false;
    }

    // Nouvelle méthode pour créer les ancres dans les listes avec gestion des clics
    static createTopAnchors(category, anchorTopObject, anchorsWrapper, categoryName) {
        let anchorTopArray = [...anchorTopObject]; 
        category.insertAdjacentElement("beforebegin", anchorsWrapper);

        anchorTopArray.forEach((anchor) => {
            const topAnchorElement = this.displayTagAnchorTop(anchor, categoryName);
            anchorsWrapper.appendChild(topAnchorElement);
        });
    }

    static displayTagAnchorTop(tagName, category) {
        const liTagAnchor = document.createElement("li");
        const crossBtnAnchor = document.createElement("button");
        const crossImg = document.createElement("img");

        liTagAnchor.classList.add("tag-top-anchor");
        liTagAnchor.setAttribute("data-value", tagName);
        liTagAnchor.setAttribute("data-category", category);
        liTagAnchor.textContent = tagName[0].toUpperCase() + tagName.slice(1).toLowerCase();

        crossBtnAnchor.classList.add("cross-top-anchor-btn");
        crossImg.setAttribute("src", "assets/icons/anchor-top-cross.svg");
        crossImg.classList.add("img-anchor-top");
        crossImg.setAttribute("alt", "une croix de fermeture");
        crossBtnAnchor.appendChild(crossImg);

        liTagAnchor.appendChild(crossBtnAnchor);

        // Ajouter l'événement de clic pour la synchronisation
        this.handleTopAnchorClick(liTagAnchor);

        return liTagAnchor;
    }

    static handleTopAnchorClick(topAnchorElement) {
        const crossBtn = topAnchorElement.querySelector(".cross-top-anchor-btn");
        const value = topAnchorElement.dataset.value;
        const category = topAnchorElement.dataset.category;

        crossBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Top anchor clicked:", value, category);
            // Utiliser la même méthode de suppression que pour les main anchors
            this.removeFilter(value, category);
        });
    }
}

export { TagManager };