import { anchorTagTop } from "../utils/anchorTagTop";
import { displayRecipes } from "../script";
import { RecipesList } from "./RecipesList";
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

export class Tag {
    constructor(value, recipes) {
        this.value = value;
        this.recipes = recipes;
        this.recipesList = new RecipesList(this.recipes);
    }

    handleTagClick(tag) {
        tag.addEventListener("click", () => {
            const value = tag.dataset.value;
            const listContainer = tag.closest(".dropdown-content");
            const tagSearchInput =
                listContainer.querySelector(".tag-search-input");
            const category = tagSearchInput.dataset.category;

            if (!this.hasAnchor(value, category)) {
                anchorObject.add({ tagName: value, category: category });
            }
            console.log(`Une ancre à été ajouté : ${value}`);
            console.log(anchorsWrapper);

            this.displayTagAnchor(anchorObject);

            let currentCategory = "";
            let currentTopAnchorsObject;
            switch (category) {
                case "ingredients":
                    currentCategory = ingredientsContainer;
                    currentTopAnchorsObject = anchorsTopIngredients.add(value);
                    anchorsTopIngredientsWrapper.innerHTML = "";
                    anchorTagTop(
                        currentCategory,
                        anchorsTopIngredients,
                        anchorsTopIngredientsWrapper
                    );

                    const filteredRecipesByIngredients =
                        this.recipesList.filterByIngredients([value]);
                    displayRecipes(filteredRecipesByIngredients);
                    console.log(filteredRecipesByIngredients);

                    break;
                case "appliances":
                    currentCategory = appliancesContainer;
                    currentTopAnchorsObject = anchorsTopAppliances.add(value);
                    anchorsTopAppliancesWrapper.innerHTML = "";
                    anchorTagTop(
                        currentCategory,
                        anchorsTopAppliances,
                        anchorsTopAppliancesWrapper
                    );
                    const filteredRecipeByAppliances =
                        this.recipesList.filterByAppliances(value);
                    displayRecipes(filteredRecipeByAppliances);
                    break;
                case "ustensils":
                    currentCategory = ustensilsContainer;
                    currentTopAnchorsObject = anchorsTopUstensils.add(value);
                    anchorsTopUstensilsWrapper.innerHTML = "";
                    anchorTagTop(
                        currentCategory,
                        anchorsTopUstensils,
                        anchorsTopUstensilsWrapper
                    );
                    const filteredRecipesByUstensils =
                        this.recipesList.filterByUstensils(value);
                    displayRecipes(filteredRecipesByUstensils);
                    break;
            }
        });
    }

    displayTag() {
        const li = document.createElement("li");
        li.setAttribute("data-value", `${this.value}`);
        li.textContent =
            this.value[0].toUpperCase() + this.value.slice(1).toLowerCase();
        this.handleTagClick(li, this.recipes);

        return li;
    }

    displayTagAnchor(array) {
        anchorsWrapper.classList.add("display");

        anchorsWrapper.innerHTML = "";
        array.forEach((anchor) => {
            let li = document.createElement("li");
            li.classList.add("tag-anchor");
            li.setAttribute("data-value", `${anchor.tagName}`);
            li.setAttribute("data-category", `${anchor.category}`);
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

    handleCrossTagClick(mainTagAnchor) {
        const mainTagAnchorValue = mainTagAnchor.dataset.value;
        const mainTagAnchorCategory = mainTagAnchor.dataset.category;
        let mainAnchorBtn = mainTagAnchor.querySelector(".anchor-cross-btn");
        //let listAnchorBtn = tag.querySelector("cross-top-anchor-btn");

        mainAnchorBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.deleteAnchorObject(mainTagAnchorValue, anchorObject);
            console.log(anchorObject);
            this.displayTagAnchor(anchorObject);
            let currentTag = [];

            switch (mainTagAnchorCategory) {
                case "ingredients":
                    console.log("categorie : ingredients");
                    console.log(anchorObject.size);

                    if (anchorObject.size === 0) {
                        displayRecipes(this.recipes);
                        console.log("ZERO");
                        
                    } else {
                        for (let i = 0; i < anchorObject.size === 0; i++) {
                            let value = anchorObject[i].value.tagName;
                            currentTag.push(value);

                            for (let j = 0; j < currentTag.length; j++) {
                                const filteredRecipesByIngredients =
                                    this.recipesList.filterByIngredientDeleteTag(
                                        currentTag[j]
                                    );
                                console.log("AFFICHAGE !!!");
                                
                                displayRecipes(filteredRecipesByIngredients);
                            }


                        }
                    }

                    break;
                case "appliances":
                    console.log("categorie : appliances");
                    break;
                case "ustensils":
                    console.log("categorie : ustensils");
                    break;
            }
        });
    }

    deleteAnchorObject(value, anchorObject) {
        console.log(value);

        for (let item of anchorObject) {
            if (item.tagName === value) {
                anchorObject.delete(item);
                break;
            }
        }
    }

    hasAnchor(value, category) {
        for (let item of anchorObject) {
            if (item.tagName === value && item.category === category) {
                return true;
            }
        }
        return false;
    }
}
