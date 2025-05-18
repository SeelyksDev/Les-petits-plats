const ingredientsContainer = document.querySelector(".ingredients-list");
const ustensilsContainer = document.querySelector(".ustensils-list");
const appliancesContainer = document.querySelector(".appliances-list");

export function anchorTagTop(category, anchorTopObject, anchorsWrapper) {
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
    const topAnchorWrapper = currentCategory.querySelector(
        ".top-anchor-wrapper"
    );

    if (anchorTopArray.length > 0 && topAnchorWrapper === null) {
        currentCategory.insertAdjacentElement("beforebegin",anchorsWrapper);
    } else if (anchorTopArray.length === 0 && topAnchorWrapper !== null) {
        topAnchorWrapper.remove();
    }

    anchorTopArray.forEach((anchor) => {
        anchorsWrapper.appendChild(displayTagAnchorTop(anchor));
    });
}

function displayTagAnchorTop(tagName) {
    const liTagAnchor = document.createElement("li");
    const crossBtnAnchor = document.createElement("button");
    const crossImg = document.createElement("img");

    liTagAnchor.classList.add("tag-top-anchor");
    liTagAnchor.textContent = tagName;

    crossBtnAnchor.classList.add("cross-top-anchor-btn");
    crossImg.setAttribute('src', 'assets/icons/anchor-top-cross.svg');
    crossImg.classList.add("img-anchor-top");
    crossImg.setAttribute("alt", "une croix de fermeture");
    crossBtnAnchor.appendChild(crossImg);

    liTagAnchor.appendChild(crossBtnAnchor);

    return liTagAnchor;
}
