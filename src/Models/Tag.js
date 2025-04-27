export class Tag {
    constructor(value) {
        this.value = value;
    }

    handleTagClick(tag) {
        tag.addEventListener("click", () => {
            
        })
    }

    displayTag() {
        const li = document.createElement("li");
        li.setAttribute("data-value", `${this.value}`)
        li.textContent = this.value[0].toUpperCase() + this.value.slice(1).toLowerCase();
        this.handleTagClick(li);

        return li;
    }
}