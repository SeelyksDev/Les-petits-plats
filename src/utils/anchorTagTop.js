export function anchorTagTop(category, anchorTopObject, anchorsWrapper) {
    let anchorTopArray = [...anchorTopObject]; 
    category.insertAdjacentElement("beforebegin", anchorsWrapper);
    console.log(anchorsWrapper);

    anchorTopArray.forEach((anchor) => {
        anchorsWrapper.appendChild(displayTagAnchorTop(anchor));
    });
}

function displayTagAnchorTop(tagName) {
    const liTagAnchor = document.createElement("li");
    const crossBtnAnchor = document.createElement("button");
    const crossImg = document.createElement("img");

    liTagAnchor.classList.add("tag-top-anchor");
    liTagAnchor.textContent =
        tagName[0].toUpperCase() + tagName.slice(1).toLowerCase();

    crossBtnAnchor.classList.add("cross-top-anchor-btn");
    crossImg.setAttribute("src", "assets/icons/anchor-top-cross.svg");
    crossImg.classList.add("img-anchor-top");
    crossImg.setAttribute("alt", "une croix de fermeture");
    crossBtnAnchor.appendChild(crossImg);

    liTagAnchor.appendChild(crossBtnAnchor);
    

    return liTagAnchor;
}
