export function filterByTag(tag, recipes) {
//Récup la category et faire une condition pour savoir à partir de quelle catégory de données je filtre mes recettes 

filteredTags = new Set();
 switch (category) {
    case "ingredients":
        recipes.forEach((el) => {
            el.ingredients.forEach((el) => {
                if (el.ingredient.toLowerCase().includes(searchValue)) {
                    filteredTags.add(el.ingredient);
                }
            });
        });
        createTags(filteredTags, "ingredients");
        break;
    case "appliances":
        filteredTags = new Set();
        recipes.forEach((el) => {
            if (el.appliance.toLowerCase().includes(searchValue)) {
                filteredTags.add(el.appliance);
            }
        });
        createTags(filteredTags, "appliances");
        break;
    case "ustensils":
        filteredTags = new Set();
        recipes.forEach((el) => {
            el.ustensils.forEach((ustensil) => {
                if (ustensil.toLowerCase().includes(searchValue)) {
                    filteredTags.add(ustensil);
                }
            });
        });
        createTags(filteredTags, "ustensils");
        break;
}
console.log(tag);
}