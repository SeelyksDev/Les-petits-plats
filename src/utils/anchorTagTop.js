const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

export function anchorTagTop(tag, category) {
    let currentCategory = "";

    switch (category) {
        case "ingredients":
            currentCategory = ingredientsContainer;
            break;
        case "appliances":
            currentCategory = appliancesContainer;
            break;
        case "ustensils":
            currentCategory = ustensilsContainer;
            break;
    }

    const liParent = document.createElement("li");
    const ul = document.createElement("ul");
    liParent.appendChild(ul);

    currentCategory.innerHTML = "anchor";
    console.log(currentCategory);

    


}