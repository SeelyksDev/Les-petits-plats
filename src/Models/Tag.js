import { filterByTag } from "../utils/filterByTag";
import { anchorTagTop } from "../utils/anchorTagTop";
const anchorsWrapper = document.querySelector(".tags-anchors-wrapper");
let anchorsTopWrapper = document.createElement("ul");
anchorsTopWrapper.classList.add("top-anchor-wrapper");
const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

let anchorObject = new Set();
let anchorsTopIngredients = new Set();
let anchorsTopAppliances = new Set();
let anchorsTopUstensils = new Set();
// let anchorTopObject = new Set();

export class Tag {
    constructor(value, recipes) {
        this.value = value;
        this.recipes = recipes;
    }

    handleTagClick(tag, recipes) {
        tag.addEventListener("click", () => {
            const value = tag.dataset.value;
            const listContainer = tag.closest(".dropdown-content");
            const tagSearchInput =
                listContainer.querySelector(".tag-search-input");
            const category = tagSearchInput.dataset.category;

            filterByTag(value, recipes, category);

            anchorObject.add(value);
            this.displayTagAnchor(anchorObject);

            let currentCategory = "";
            let currentTopAnchorsObject;
            switch (category) {
                case "ingredients":
                    currentCategory = ingredientsContainer;
                    currentTopAnchorsObject = anchorsTopIngredients.add(value);
                    break;
                case "appliances":
                    currentCategory = appliancesContainer;
                    currentTopAnchorsObject = anchorsTopAppliances.add(value);
                    break;
                case "ustensils":
                    currentCategory = ustensilsContainer;
                    currentTopAnchorsObject = anchorsTopUstensils.add(value);
                    break;
            }

            anchorsTopWrapper.innerHTML = "";
            // anchorTopObject.add(value);
            anchorTagTop(currentCategory, currentTopAnchorsObject, anchorsTopWrapper);
        });
    }

    handleCrossTagClick(tag, array) {
        const anchorCross = document.querySelector(".anchor-cross-btn");
        let tagName = tag.dataset.value;
        anchorCross.addEventListener("click", (e) => {
            e.preventDefault();
            this.deleteTagAnchor(array, tagName);
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
        anchorsWrapper.innerHTML = "";
        array.forEach((anchor) => {
            let li = document.createElement("li");
            li.classList.add("tag-anchor");
            li.setAttribute("data-value", `${anchor}`);
            li.innerHTML = `
                <span class="anchor-text">${
                    anchor[0].toUpperCase() + anchor.slice(1).toLowerCase()
                }</span>
                <button class="anchor-cross-btn">
                    <img
                        src="/assets/icons/cross.svg"
                        alt="bouton croix"
                    />
                </button>
    `;
            anchorsWrapper.appendChild(li);
            this.handleCrossTagClick(li, array);
        });
    }

    deleteTagAnchor(anchorsObject, tag) {
        let anchorsArray = [...anchorsObject];
        let newAnchorArray = anchorsArray.filter((anchor) => anchor !== tag);
        this.displayTagAnchor(newAnchorArray);
    }
}
