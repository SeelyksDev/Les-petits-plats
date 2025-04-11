export class Tag {
    constructor(value) {
        this.value = value;
    }

    displayTag() {
        const li = document.createElement("li");
        li.textContent = this.value[0].toUpperCase() + this.value.slice(1).toLowerCase();

        return li;
    }
}