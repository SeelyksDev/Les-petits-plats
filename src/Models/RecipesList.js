export class RecipesList {
    constructor(recipes) {
        this.recipes = recipes;
    }

    filterByIngredients(ingredient) {        
        return this.recipes.filter(
            (el) =>
                el.ingredients.filter(
                    (ingr) =>
                        ingredient.includes(ingr.ingredient.toLowerCase())    
                ).length > 0
        );
    }

    filterByAppliances(appliance) {
        return this.recipes.filter(
            (el) => appliance.toLowerCase() === el.appliance.toLowerCase()
        );
    }

    filterByUstensils(ustensil) {
        return this.recipes.filter(
            (el) =>
                el.ustensils.filter(
                    (ust) => ustensil.toLowerCase() === ust.toLowerCase()
                ).length > 0
        );
    }

    filterByIngredientDeleteTag(ingredient) {
        return this.recipes.filter(
            (el) =>
                el.ingredients.filter(
                    (ingr) => 
                        !ingredient.includes(ingr.ingredient.toLowerCase())
                ).length > 0
        );
    }
}
