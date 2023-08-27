// async function getRecipes() {
//     return fetch("../../recipes.js") .then((reponse) => reponse.json())
// }



// Barre de recherche

const search = document.getElementById("search")
function searchFiltre(){
    const inputV = search.value.toLowerCase()
    const result = recipes.filter((recipe) => recipe.name.toLowerCase().includes(inputV) 
    || recipe.description.toLowerCase().includes(inputV)
    // || recipe.ingredients.ingredient.toLowerCase().includes(inputV)
    || recipe.description.toLowerCase().includes(inputV)
    || recipe.appliance.toLowerCase().includes(inputV)
    // || recipe.ustensils.toLowerCase().includes(inputV)
    )
    console.log(result)
    if (result.length >= 1){
    document.getElementById("recettes").textContent = ""
    displayData(result)
    }
}

// Affichage recettes

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
    // const { recipes } = await getRecipes()
    displayData(recipes)
}


init()