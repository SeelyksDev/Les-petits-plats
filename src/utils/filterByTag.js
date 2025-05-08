import { displayRecipes } from "../script";

export function filterByTag(tag, recipes, category) {
    const tagName = tag.toLowerCase();
    let filteredTags = [];
    switch (category) {
        case "ingredients":
            recipes.forEach((el) => {
                el.ingredients.forEach((ingr) => {
                    if (ingr.ingredient.toLowerCase().includes(tagName)) {
                        filteredTags.push(el);
                    }
                });
            });
            break;

        case "appliances":
            recipes.forEach((el) => {
                if (el.appliance.toLowerCase().includes(tagName)) {
                    filteredTags.push(el);
                }
            });
            break;

        case "ustensils":
            recipes.forEach((el) => {
                el.ustensils.forEach((ustensil) => {
                    if (ustensil.toLowerCase().includes(tagName)) {
                        filteredTags.push(el);
                    }
                });
            });
            break;
    }
    displayRecipes(filteredTags);
    console.log(filteredTags);
}
