

function getrecetteCardDom(data) {

const photoRecette = `Assets/PhotoRecettes/${data.image}`

    const article = document.createElement("article");

    const image = document.createElement("img");
    image.setAttribute("src", photoRecette);
    article.appendChild(image);
    const divTime = document.createElement("div");
    article.appendChild(divTime);
    divTime.setAttribute("class", "time")
    const pTime = document.createElement("p");
    pTime.textContent = data.time + "min"
    divTime.appendChild(pTime)

    const div1 = document.createElement("div");
    div1.setAttribute("class", "alldesc")
    article.appendChild(div1);

    const name = document.createElement("h2");
    name.textContent = data.name;
    div1.appendChild(name);
    const h3Recette = document.createElement("h3");
    h3Recette.textContent = "RECETTE";
    div1.appendChild(h3Recette);
    const description = document.createElement("p");
    description.textContent = data.description;
    description.setAttribute("class", "txtdescription")
    div1.appendChild(description);
    const h3Ingredients = document.createElement("h3");
    h3Ingredients.textContent = "INGREDIENTS";
    div1.appendChild(h3Ingredients);

    
    const div2 = document.createElement("div");
    div2.setAttribute("class", "alling")
    div1.appendChild(div2);

    data.ingredients.forEach((ingredients) => {
        const div3 = document.createElement("div");
        div3.setAttribute("class", "ing")
        const h4 = document.createElement("h4");
        h4.textContent = ingredients.ingredient;
        const quantity = document.createElement("p");
        if (!ingredients.unit){
            quantity.textContent = ingredients.quantity;
        } else {
        quantity.textContent = ingredients.quantity + ingredients.unit;
        }
        quantity.style.color = "#7A7A7A"
        div3.appendChild(h4)
        div3.appendChild(quantity)
        div2.appendChild(div3)
        })

    return article

}

