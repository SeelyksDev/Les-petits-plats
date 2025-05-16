const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

export function anchorTagTop(category, anchorTopObject) {
    const topAnchorWrapper = currentCategory.querySelector(
        ".top-anchor-wrapper"
    );
    let anchorTopArray = [...anchorTopObject];
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

    if (anchorTopArray.length > 0 && topAnchorWrapper === null) {
        const ul = document.createElement("ul");
        ul.classList.add("top-anchor-wrapper");
        currentCategory.insertAdjacentElement("beforebegin", ul);
    } else if (anchorTopArray.length === 0 && topAnchorWrapper !== null) {
        topAnchorWrapper.remove();
    }

    anchorTopArray.forEach((anchor) => {
        displayTagAnchorTop(anchor);
    });
}

function displayTagAnchorTop(tagName) {
    const liTagAnchor = document.createElement("li");
    liTagAnchor.classList.add("tag-top-anchor");
    liTagAnchor.textContent = tagName;

    return liTagAnchor;
}
