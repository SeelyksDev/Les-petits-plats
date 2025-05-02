import { filterByTag } from "../utils/filterByTag";

export class Tag {
    constructor(value, recipes) {
        this.value = value;
        this.recipes = recipes;
    }

    handleTagClick(tag, recipes) {
        tag.addEventListener("click", () => {
            const value = tag.dataset.value;
            filterByTag(value, recipes);
        })
    }

    displayTag() {
        const li = document.createElement("li");
        li.setAttribute("data-value", `${this.value}`)
        li.textContent = this.value[0].toUpperCase() + this.value.slice(1).toLowerCase();
        this.handleTagClick(li, this.recipes);

        return li;
    }
}