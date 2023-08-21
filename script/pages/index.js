
async function displayData(recipes) {
    const recettesSection = document.getElementById("recettes")
    
    recipes.forEach((recipes) => {
        // const recettesModel = recetteFactory(recipes);
        const recetteCardDom = getrecetteCardDom(recipes);
        recettesSection.appendChild(recetteCardDom)
    })
}

async function init(){
    // Récupération des recettes
    console.log(recipes)
    displayData(recipes)
}


init()