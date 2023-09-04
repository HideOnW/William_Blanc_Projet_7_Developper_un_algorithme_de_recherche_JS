async function getRecipes() {
    return fetch("../../recipes.js") .then((reponse) => reponse.json())
}

const listeIngredients = []

function getIngredient (){
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const ing = ingredient.ingredient.toLowerCase()
            if(!listeIngredients.includes(ing)){
                listeIngredients.push(ing)
            }
        })
    })
}


const listeAppareils = []

function getAppareil(){
    recipes.forEach((recipe) => {
        if(!listeAppareils.includes(recipe.appliance)){
            listeAppareils.push(recipe.appliance)
        }
    })
}


const listeUstensils = []

function getUstensils(){
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            const ust = ustensil.toLocaleLowerCase()
            if(!listeUstensils.includes(ust)){
                listeUstensils.push(ust)
            }
        })
    })
}


// Barre de recherche

const jssearch = document.querySelector('.search')
jssearch.addEventListener('input', searchFiltre)
function searchFiltre(){
    const inputV = jssearch.value.toLowerCase()
    const result = recipes.filter((recipe) => recipe.name.toLowerCase().includes(inputV) 
    || recipe.description.toLowerCase().includes(inputV)
    || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputV))
    || recipe.appliance.toLowerCase().includes(inputV)
    || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputV))
    )
    document.getElementById("recettes").textContent = ""
    displayData(result)
    if (result.length === 0){
    let error = document.createElement("h1")
    error.innerHTML = "Aucune recettes trouvé"
    document.getElementById("recettes").appendChild(error)
    }

    if(inputV.length > 2){
        document.getElementById("inputsearch").style.display = "block";
        underInput(inputV, recipes)
    } else {
        document.getElementById("inputsearch").style.display = "none";
    }
    if(inputV.length === 0){
        document.getElementById("inputsearch").style.display = "none";
    }
}

function underInput(inputV, recipes){
    const results = []
    listeIngredients.forEach((ingredient) => {
        if(ingredient.toLowerCase().includes(inputV)){
            results.push(ingredient)
        }
    })

    listeAppareils.forEach((appareil) => {
        if(appareil.toLowerCase().includes(inputV)){
            results.push(appareil)
        }
    })

    listeUstensils.forEach((ustensil) => {
        if(ustensil.toLowerCase().includes(inputV)){
            results.push(ustensil)
        }
    })
    console.log(results)
    searchInputDisplay(results)
    
}


function searchInputDisplay (results){
    const inputSearch = document.getElementById("inputsearch")
    inputSearch.textContent = ""
    results.forEach((result) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        div.appendChild(p)
        p.textContent = result
        inputSearch.appendChild(div)
        div.addEventListener("click", function(event){
            const clickFilter = event.target.innerText
            document.getElementById("jssearch").value = clickFilter
            document.getElementById("inputsearch").style.display = "none";
            console.log(event)
            searchFiltre()
        })
    })
}



function displayFiltre (){
    const input = document.getElementById("jssearch");
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
    getIngredient(recipes) 
    getAppareil(recipes)
    getUstensils(recipes)
    displayData(recipes)
    
}


init()


