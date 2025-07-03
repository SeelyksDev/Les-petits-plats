import { TagManager } from "./TagManager";

export class Tag {
    constructor(value) {
        this.value = value;
    }

    handleTagClick(tag) {
        tag.addEventListener("click", () => {
            const value = tag.dataset.value;
            const listContainer = tag.closest(".dropdown-content");
            const tagSearchInput = listContainer.querySelector(".tag-search-input");
            const category = tagSearchInput.dataset.category;

            console.log("Tag clicked:", value, category);
            TagManager.addFilter(value, category);
        });
    }

    displayTag() {
        const li = document.createElement("li");
        li.setAttribute("data-value", this.value);
        li.textContent = this.value[0].toUpperCase() + this.value.slice(1).toLowerCase();
        this.handleTagClick(li);
        return li;
    }
}