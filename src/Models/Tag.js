export class Tag {
    constructor(value) {
        this.value = value;
    }

    displayTag() {
        const li = document.createElement("li");
        li.textContent = this.value;

        return li;
    }
}