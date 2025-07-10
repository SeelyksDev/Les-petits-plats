export class Recipe {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
    }

    getNewRecipeDOM() {
    const article = document.createElement("li");
    article.classList.add("recipe-card");

    const header = document.createElement("header");
    header.classList.add("recipe-img-wrapper");

    const img = document.createElement("img");
    img.src = `/assets/recipes-img-folder/${this.image}`;
    img.alt = this.name;

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("time-recipe");
    timeSpan.textContent = `${this.time}min`;

    header.appendChild(img);
    header.appendChild(timeSpan);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("recipe-content");

    const title = document.createElement("h2");
    title.classList.add("recipe-title");
    title.textContent = this.name;

    const sectionRecipe = document.createElement("section");
    sectionRecipe.classList.add("recipe");

    const titleRecipe = document.createElement("h3");
    titleRecipe.classList.add("section-title");
    titleRecipe.textContent = "RECETTE";

    const desc = document.createElement("p");
    desc.classList.add("recipe-text");
    desc.textContent = this.description;

    sectionRecipe.appendChild(titleRecipe);
    sectionRecipe.appendChild(desc);

    const sectionIngredients = document.createElement("section");
    sectionIngredients.classList.add("ingredients-section");

    const titleIngredients = document.createElement("h3");
    titleIngredients.classList.add("section-title");
    titleIngredients.textContent = "INGRÉDIENTS";

    const ul = document.createElement("ul");
    ul.classList.add("ingredients-wrapper");

    this.ingredients.forEach((el) => {
        const li = document.createElement("li");
        li.classList.add("ingredient");

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("ingredient-name");
        nameSpan.textContent = el.ingredient;

        const quantitySpan = document.createElement("span");
        quantitySpan.classList.add("ingredient-quantity");

        const quantity = el.quantity ? el.quantity : "";
        const unit = el.unit && el.unit.length > 2 ? " " + el.unit : el.unit || "";

        quantitySpan.textContent = quantity + unit;

        li.appendChild(nameSpan);
        li.appendChild(quantitySpan);
        ul.appendChild(li);
    });

    sectionIngredients.appendChild(titleIngredients);
    sectionIngredients.appendChild(ul);

    // --- Final ---
    contentDiv.appendChild(title);
    contentDiv.appendChild(sectionRecipe);
    contentDiv.appendChild(sectionIngredients);

    article.appendChild(header);
    article.appendChild(contentDiv);

    return article;
}
}
