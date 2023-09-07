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
    let results = [recipes]
    const activedFilter = document.querySelectorAll(".pFilter")
    console.log(activedFilter)
    if (activedFilter.length > 0){
        results = []
        activedFilter.forEach(filter => {
            filterRecipe(filter, activedFilter, recipes, results)
        })
    } else {
        results = recipes
    }
    
    console.log(results)
    const inputV = jssearch.value.toLowerCase()
    results = results.filter((result) => result.name.toLowerCase().includes(inputV) 
    || result.description.toLowerCase().includes(inputV)
    || result.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputV))
    || result.appliance.toLowerCase().includes(inputV)
    || result.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputV))
    )
    document.getElementById("recettes").textContent = ""
    displayData(results)
    if (results.length === 0){
    let error = document.createElement("h1")
    error.innerHTML = "Aucune recettes trouvé"
    document.getElementById("recettes").appendChild(error)
    document.getElementById("inputsearch").style.display = "none";
    }

    if(inputV.length > 2){
        document.getElementById("inputsearch").style.display = "block";
        underInput(inputV, recipes)
    } else {
        document.getElementById("inputsearch").style.display = "none";
    }
    if(inputV.length === 0 ){
        document.getElementById("inputsearch").style.display = "none";
    }
}



function filterRecipe(filter, activedFilter, recipes, result) {
    const txtFilter = filter.innerHTML
    console.log(txtFilter)
    result = result.filter((recipe) => recipe.name.toLowerCase().includes(txtFilter) 
    || recipe.description.toLowerCase().includes(txtFilter)
    || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(txtFilter))
    || recipe.appliance.toLowerCase().includes(txtFilter)
    || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(txtFilter))
    )
    console.log(result)
    return result
}


function underInput(inputV, recipes){
    const results = []
    listeIngredients.forEach((ingredient) => {
        if(ingredient.toLowerCase().includes(inputV)){
            let ing = {ingredient:ingredient, type:"ingredient"}
            results.push(ing)
        }
    })

    listeAppareils.forEach((appareil) => {
        if(appareil.toLowerCase().includes(inputV)){
            let app = {appareil:appareil, type:"appareil"}
            results.push(app)
        }
    })

    listeUstensils.forEach((ustensil) => {
        if(ustensil.toLowerCase().includes(inputV)){
            let ust = {ustensil:ustensil, type:"ustensil"}
            results.push(ust)
        }
    })
    searchInputDisplay(results)
    
}






function searchInputDisplay (results){
    const inputSearch = document.getElementById("inputsearch")
    inputSearch.textContent = ""
    results.forEach((result) => {
       
        const div = document.createElement("div")
        const p = document.createElement("p")
        div.appendChild(p)
        if(result.ingredient){
            p.textContent = result.ingredient
        } else if (result.appareil){
            p.textContent = result.appareil
        } else if (result.ustensil){
            p.textContent = result.ustensil
        } 
        inputSearch.appendChild(div)
        div.addEventListener("click", function(event){
            const clickFilter = event.target.innerText
            document.getElementById("jssearch").value = clickFilter
            document.getElementById("inputsearch").style.display = "none";
            console.log(event)
            displayFiltre(clickFilter, result.type)
            searchFiltre()
        })
    })
}



function displayFiltre (clickFilter, type){
    const div = document.createElement("div")
    div.setAttribute("class", "addedFilter")
    div.setAttribute("data-type", type)
    const p = document.createElement("p")
    p.setAttribute("class", "pFilter")
    p.setAttribute("data-type", type)
    div.appendChild(p)
    p.textContent = clickFilter
    const img = document.createElement("img")
    img.setAttribute("src", `./Assets/Cross.png`)
   
    div.appendChild(img)
    if(type === "ingredient"){
        document.getElementById("ingredients").appendChild(div)
         img.addEventListener("click", () => {
        document.getElementById("ingredients").removeChild(div) 
    })     
    } else if(type === "appareil"){
        document.getElementById("appareils").appendChild(div)
         img.addEventListener("click", () => {
        document.getElementById("appareils").removeChild(div) 
    })     
    } else if(type === "ustensil"){
        document.getElementById("ustensils").appendChild(div)
         img.addEventListener("click", () => {
        document.getElementById("ustensils").removeChild(div) 
    })     
    }
}

// function removefilter(div){
//     document.getElementById("ingredients").removeChild(div)       

// }

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


