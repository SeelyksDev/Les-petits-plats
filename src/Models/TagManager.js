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
                anchorsTopIngredientsWrapper.textContent = "";
                this.createTopAnchors(
                    ingredientsContainer,
                    anchorsTopIngredients,
                    anchorsTopIngredientsWrapper,
                    "ingredients"
                );
                break;
            case "appliances":
                anchorsTopAppliances.add(value);
                anchorsTopAppliancesWrapper.textContent = "";
                this.createTopAnchors(
                    appliancesContainer,
                    anchorsTopAppliances,
                    anchorsTopAppliancesWrapper,
                    "appliances"
                );
                break;
            case "ustensils":
                anchorsTopUstensils.add(value);
                anchorsTopUstensilsWrapper.textContent = "";
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
                anchorsTopIngredientsWrapper.textContent = "";
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
                anchorsTopAppliancesWrapper.textContent = "";
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
                anchorsTopUstensilsWrapper.textContent = "";
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
        if (anchorObject.size === 0) {
            displayRecipes(originalRecipes);
            return;
        }

        let filteredRecipes = originalRecipes;
        const activeFilters = Array.from(anchorObject);

        const ingredientFilters = activeFilters
            .filter((filter) => filter.category === "ingredients")
            .map((filter) => filter.tagName.toLowerCase());

        const applianceFilters = activeFilters
            .filter((filter) => filter.category === "appliances")
            .map((filter) => filter.tagName.toLowerCase());

        const ustensilFilters = activeFilters
            .filter((filter) => filter.category === "ustensils")
            .map((filter) => filter.tagName.toLowerCase());

        if (ingredientFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                ingredientFilters.every((ingredient) =>
                    recipe.ingredients.some(
                        (recipeIngredient) =>
                            recipeIngredient.ingredient.toLowerCase() ===
                            ingredient
                    )
                )
            );
        }

        if (applianceFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                applianceFilters.includes(recipe.appliance.toLowerCase())
            );
        }

        if (ustensilFilters.length > 0) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
                ustensilFilters.every((ustensil) =>
                    recipe.ustensils.some(
                        (recipeUstensil) =>
                            recipeUstensil.toLowerCase() === ustensil
                    )
                )
            );
        }
        displayRecipes(filteredRecipes);
    }

    static displayTagAnchor() {
        if (anchorObject.size === 0) {
            anchorsWrapper.classList.remove("display");
            anchorsWrapper.textContent = "";
            return;
        }

        anchorsWrapper.classList.add("display");
        anchorsWrapper.textContent = "";

        anchorObject.forEach((anchor) => {
            let li = document.createElement("li");
            li.classList.add("tag-anchor");
            li.setAttribute("data-value", anchor.tagName);
            li.setAttribute("data-category", anchor.category);

            const span = document.createElement("span");
            span.classList.add("anchor-text");
            span.textContent =
                anchor.tagName[0].toUpperCase() +
                anchor.tagName.slice(1).toLowerCase();

            const button = document.createElement("button");
            button.classList.add("anchor-cross-btn");

            const img = document.createElement("img");
            img.setAttribute("src", "/assets/icons/cross.svg");
            img.setAttribute("alt", "bouton croix");

            button.appendChild(img);
            li.appendChild(span);
            li.appendChild(button);

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

    static createTopAnchors(
        category,
        anchorTopObject,
        anchorsWrapper,
        categoryName
    ) {
        let anchorTopArray = [...anchorTopObject];
        category.insertAdjacentElement("beforebegin", anchorsWrapper);

        anchorTopArray.forEach((anchor) => {
            const topAnchorElement = this.displayTagAnchorTop(
                anchor,
                categoryName
            );
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
        liTagAnchor.textContent =
            tagName[0].toUpperCase() + tagName.slice(1).toLowerCase();

        crossBtnAnchor.classList.add("cross-top-anchor-btn");
        crossImg.setAttribute("src", "assets/icons/anchor-top-cross.svg");
        crossImg.classList.add("img-anchor-top");
        crossImg.setAttribute("alt", "une croix de fermeture");
        crossBtnAnchor.appendChild(crossImg);

        liTagAnchor.appendChild(crossBtnAnchor);

        this.handleTopAnchorClick(liTagAnchor);

        return liTagAnchor;
    }

    static handleTopAnchorClick(topAnchorElement) {
        const crossBtn = topAnchorElement.querySelector(
            ".cross-top-anchor-btn"
        );
        const value = topAnchorElement.dataset.value;
        const category = topAnchorElement.dataset.category;

        crossBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.removeFilter(value, category);
        });
    }
}

export { TagManager };
