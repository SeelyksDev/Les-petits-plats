export class Recipe {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
    }

    getNewRecipeDOM() {
        let ingredientsHTML = "";
        this.ingredients.forEach((el) => {
            ingredientsHTML += `
                <li class="ingredient">
                  <span class="ingredient-name">${el.ingredient}</span>
                  <span class="ingredient-quantity">${
                      el.quantity ? el.quantity : ""
                  }${
                el.unit && el.unit.length > 2 ? " " + el.unit : el.unit || ""
            }
                  </span>
                </li>
            `;
        });

        const article = document.createElement("li");
        article.classList.add("recipe-card");

        article.innerHTML = `
             <header class="recipe-img-wrapper">
                        <img
                            src="/assets/recipes-img-folder/${this.image}"
                            alt="${this.name}"
                        />
                        <span class="time-recipe">${this.time}min</span>
                    </header>
                    <div class="recipe-content">
                        <h2 class="recipe-title">${this.name}</h2>
                        <section class="recipe">
                            <h3 class="section-title">RECETTE</h3>
                            <p class="recipe-text">
                                ${this.description}
                            </p>
                        </section>
                        <section class="ingredients-section">
                            <h3 class="section-title">INGRÉDIENTS</h3>
                            <ul class="ingredients-wrapper">
                                ${ingredientsHTML}
                            </ul>
                        </section>
                    </div>
        `;

        return article;
    }
}
