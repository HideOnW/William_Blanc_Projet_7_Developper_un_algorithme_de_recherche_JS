async function getRecipes() {
    return fetch("../../recipes.js").then((reponse) => 
        reponse.json()
        .then((recipes) => {
            console.log(recipes)
        })

    )
}



const jssearch = document.querySelector('.search')
jssearch.addEventListener('input', searchFiltre)

// Liste Spécifique


let listeIngredients = []

function getIngredient(recipes, displayType) {
    listeIngredients = []
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const ing = ingredient.ingredient.toLowerCase()
            if (!listeIngredients.includes(ing)) {
                listeIngredients.push(ing)
            }
        })
    })

    const allFilters = document.querySelectorAll('.pFilter')

    if(allFilters){
        allFilters.forEach((filtre) => {
            listeIngredients = listeIngredients.filter((liste) => liste !== filtre.innerHTML)
        })
    }

    displayUnderInputFiltre(listeIngredients, "ingredient")
}


let listeAppareils = []

function getAppareil(recipes) {
    listeAppareils = []
    recipes.forEach((recipe) => {
        if (!listeAppareils.includes(recipe.appliance)) {
            listeAppareils.push(recipe.appliance)
        }
    })

    const allFilters = document.querySelectorAll('.pFilter')

    if(allFilters){
        allFilters.forEach((filtre) => {
            listeAppareils = listeAppareils.filter((liste) => liste !== filtre.innerHTML)
        })
    }

    
    displayUnderInputFiltre(listeAppareils, "appareil")


}


let listeUstensils = []

function getUstensil(recipes) {
    listeUstensils = []
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            const ust = ustensil.toLocaleLowerCase()
            if (!listeUstensils.includes(ust)) {
                listeUstensils.push(ust)
            }
        })
    })

    const allFilters = document.querySelectorAll('.pFilter')

    if(allFilters){
        allFilters.forEach((filtre) => {
            listeUstensils = listeUstensils.filter((liste) => liste !== filtre.innerHTML)
        })
    }
    

    displayUnderInputFiltre(listeUstensils, "ustensil")

}




// Recherche Barre principale


function searchFiltre() {
    const inputV = jssearch.value.toLowerCase()

    
    const testRecipes = []

    for (const n of recipes) {
        if(n.name.toLowerCase().includes(inputV)
        || n.description.toLowerCase().includes(inputV) 
        || n.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputV))
        || n.appliance.toLowerCase().includes(inputV)
        || n.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputV))){            
            testRecipes.push(n)
        }
    }

    document.getElementById("recettes").textContent = ""

    const recipesToDisplay = filterRecipe(testRecipes)

    console.log(recipesToDisplay)

    
    const nbRecette = document.getElementById("nbrecette")
    nbRecette.textContent = recipesToDisplay.length + " recettes"
    
    displayData(recipesToDisplay)




    if (testRecipes.length === 0) {
        let error = document.createElement("h1")
        error.innerHTML = "Aucune recette ne contient vous '" + inputV + "' vous pouvez chercher «tarteauxpommes», «poisson», etc."
        document.getElementById("recettes").appendChild(error)
        document.getElementById("inputsearch").style.display = "none";
        getIngredient(recipes)
        getAppareil(recipes)
        getUstensil(recipes)
        
    } 

    if (inputV.length > 2) {
        document.getElementById("inputsearch").style.display = "block";
        showFilterUnderInput(inputV, recipes)

        
    } else {
        document.getElementById("inputsearch").style.display = "none";
    }

}


function filterRecipe(recipesToDisplay) {

    const allFilters = document.querySelectorAll('.pFilter')
    let filteredRecipes = [...recipesToDisplay];
    let newarray = []

    console.log("test", allFilters)



    if(allFilters.length != 0){
    allFilters.forEach((filter) => {
        const txtFilter = filter.innerHTML.toLowerCase(); 

        if(newarray.length === 0){       

        for(let i = 0; i < filteredRecipes.length; i++ ){
            if(filteredRecipes[i].name.toLowerCase().includes(txtFilter)
            || filteredRecipes[i].description.toLowerCase().includes(txtFilter) 
            || filteredRecipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(txtFilter))
            || filteredRecipes[i].appliance.toLowerCase().includes(txtFilter)
            || filteredRecipes[i].ustensils.some(ustensil => ustensil.toLowerCase().includes(txtFilter))){
                newarray.push(filteredRecipes[i])
        }
    }} else {

        filteredRecipes = newarray
        newarray =[]

        for(let i = 0; i < filteredRecipes.length; i++ ){
            if(filteredRecipes[i].name.toLowerCase().includes(txtFilter)
            || filteredRecipes[i].description.toLowerCase().includes(txtFilter) 
            || filteredRecipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(txtFilter))
            || filteredRecipes[i].appliance.toLowerCase().includes(txtFilter)
            || filteredRecipes[i].ustensils.some(ustensil => ustensil.toLowerCase().includes(txtFilter))){
                newarray.push(filteredRecipes[i])}
    }
    }});

    if (newarray.length === 0){
        return filteredRecipes
    } else {
        return newarray
    }
} else {
    return filteredRecipes
}
}


function showFilterUnderInput(inputV) {
    const results = []
    const tagActive = document.querySelectorAll('.pFilter')
    listeIngredients.forEach((ingredient) => {
        if (ingredient.toLowerCase().includes(inputV) || !ingredient.toLowerCase()) {
            let ing = { ingredient: ingredient, type: "ingredient" }
            results.push(ing)
        }
    })

    listeAppareils.forEach((appareil) => {
        if (appareil.toLowerCase().includes(inputV)) {
            let app = { appareil: appareil, type: "appareil" }
            results.push(app)
        }
    })

    listeUstensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(inputV)) {
            let ust = { ustensil: ustensil, type: "ustensil" }
            results.push(ust)
        }
    })
    searchInputDisplay(results)

}


function searchInputDisplay(results) {

    const inputSearch = document.getElementById("inputsearch")
    inputSearch.textContent = ""

    results.forEach((result) => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        div.appendChild(p)
        if (result.ingredient) {
            p.textContent = result.ingredient
        } else if (result.appareil) {
            p.textContent = result.appareil
        } else if (result.ustensil) {
            p.textContent = result.ustensil
        }
        inputSearch.appendChild(div)
        div.addEventListener("click", function (event) {
            const clickFilter = event.target.innerText
            const allFilters = document.querySelectorAll('.pFilter')
            let filtreInactif = true
            for (const filtre of allFilters){
                if (filtre.innerText === clickFilter){
                    filtreInactif = false
                    break
                }
            }
            if(filtreInactif){
            document.getElementById("jssearch").value = ""
            document.getElementById("inputsearch").style.display = "none";
            displayFiltre(clickFilter, result.type)
            searchFiltre()
            }
        })
    })
}


function displayFiltre(clickFilter, type) {

    const allFilters = document.querySelectorAll('.pFilter')
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

    const ptag = document.createElement("p")
    ptag.classList.add(type + "tagFilter")
    ptag.textContent = clickFilter

    if (type === "ingredient") {
        document.getElementById("ingredients").appendChild(div)
        document.getElementById("ingFilter").appendChild(ptag)

        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    } else if (type === "appareil") {
        document.getElementById("appareils").appendChild(div)
        document.getElementById("appFilter").appendChild(ptag)
        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    } else if (type === "ustensil") {
        document.getElementById("ustensils").appendChild(div)
        document.getElementById("ustFilter").appendChild(ptag)

        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    }
}


// Recherche spécifique 

function displayUnderInputFiltre(liste, type, clickFilter, tagModif) {
    const divIng = document.getElementById("ingFilter")
    const divApp = document.getElementById("appFilter")
    const divUst = document.getElementById("ustFilter")

    
    const itemToDelete = document.querySelectorAll(`.${type}itemFilter`)
    itemToDelete.forEach((item) => {
        item.remove()
    })
    liste.forEach((data) => {
        const p = document.createElement('p')
        p.classList.add(type + "itemFilter")
        p.textContent = data
        if(type === "ingredient") {
            divIng.appendChild(p)
        } else if (type === "appareil") {
            divApp.appendChild(p)
        } else if (type === "ustensil") {
            divUst.appendChild(p)
        }
        p.addEventListener("click", function (event) {   
            event.preventDefault()         
            const clickFilter = event.target.innerText
            const allFilters = document.querySelectorAll('.pFilter')
            let filtreInactif = true
            for (const filtre of allFilters){
                if (filtre.innerText === clickFilter){
                    filtreInactif = false
                    break
                }
            }
            if(filtreInactif){
                if(type === "ingredient") {
                    divIng.appendChild(p)
                } else if (type === "appareil") {
                    divApp.appendChild(p)
                } else if (type === "ustensil") {
                    divUst.appendChild(p)
                }
            displayFiltre(clickFilter, type)
            searchFiltre()
            }
        })
    })
}

const ingInput = document.querySelector('.ingInput')
const appInput = document.querySelector('.appInput')
const ustInput = document.querySelector('.ustInput')

ingInput.addEventListener('input', (e) =>  {
    searchInput(e, ingInput, listeIngredients, "ingredient")
})


appInput.addEventListener('input', (e) =>  {
    searchInput(e, appInput, listeAppareils, "appareil")
})


ustInput.addEventListener('input', (e) =>  {
    searchInput(e, ustInput, listeUstensils, "ustensil")
})


function searchInput(e, input, liste, type) {
    e.preventDefault()
    console.log("test")
    const inputV = input.value.toLowerCase()
    if(inputV.length > 2){
    const searchListe = liste.filter((result) => result.toLowerCase().includes(inputV))
    console.log(searchListe)
    displayUnderInputFiltre(searchListe, type)
    }
    if(inputV.length === 0){
        searchListe = liste
        displayUnderInputFiltre(searchListe, type)        
    }
    
}

//Affichage des données

async function displayData(recipesToDisplay, displayType) {

    const recettesSection = document.getElementById("recettes")

    const recipesFiltered =  filterRecipe(recipesToDisplay)

    
    getIngredient(recipesFiltered, displayType)
    getAppareil(recipesFiltered, displayType)
    getUstensil(recipesFiltered, displayType)

    recipesFiltered.forEach((recipes) => {
        const recetteCardDom = getrecetteCardDom(recipes);
        recettesSection.appendChild(recetteCardDom)
    })
}

async function init() {
    displayData(recipes, "init")
    // getRecipes()
}


init()

