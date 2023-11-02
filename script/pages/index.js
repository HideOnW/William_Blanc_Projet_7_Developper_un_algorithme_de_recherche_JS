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
            listeUstensils = listeUstensils.filter((liste) => liste !== filtre)
        })
    }
    

    displayUnderInputFiltre(listeUstensils, "ustensil")

}




// Recherche Barre principale


function searchFiltre() {
    const inputV = jssearch.value.toLowerCase()

    const testRecipes = recipes.filter((result) => result.name.toLowerCase().includes(inputV)
        || result.description.toLowerCase().includes(inputV)
        || result.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputV))
        || result.appliance.toLowerCase().includes(inputV)
        || result.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputV))
    )
    document.getElementById("recettes").textContent = ""

    const recipesToDisplay = filterRecipe(testRecipes)
    
    displayData(recipesToDisplay)


    if (testRecipes.length === 0) {
        let error = document.createElement("h1")
        error.innerHTML = "Aucune recette ne contient vous '" + inputV + "' vous pouvez chercher «tarteauxpommes», «poisson», etc."
        document.getElementById("recettes").appendChild(error)
        document.getElementById("inputsearch").style.display = "none";
        getIngredient(recipes)
        getAppareil(recipes)
        getUstensils(recipes)
        
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

    allFilters.forEach((filter) => {
        const txtFilter = filter.innerHTML.toLowerCase(); 
        filteredRecipes = filteredRecipes.filter((recipe) => 
            recipe.name.toLowerCase().includes(txtFilter)
            || recipe.description.toLowerCase().includes(txtFilter)
            || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(txtFilter))
            || recipe.appliance.toLowerCase().includes(txtFilter)
            || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(txtFilter))
        );
    });
    return filteredRecipes
}


function showFilterUnderInput(inputV) {
    const results = []
    const tagActive = document.querySelectorAll('.pFilter')
    console.log(tagActive)
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
    // div.setAttribute("id", `${clickFilter}`)
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
    // ptag.setAttribute("id", `${clickFilter}`)
    ptag.textContent = clickFilter
    console.log(ptag)
        // if(type === "ingredient") {
        //     divIng.appendChild(ptag)
        // } else if (type === "ingredient" && tagModif === "removeTag") {
        //     const tagToRemove = document.getElementById(`${clickFilter}`)
        //     divUst.remove(tagToRemove)
        // }
        
        // if (type === "appareil") {
        //     divApp.appendChild(ptag)
        // } else if (type === "appareil" && tagModif === "removeTag") {
        //     const tagToRemove = document.getElementById(`${clickFilter}`)
        //     divUst.remove(tagToRemove)
        // }
        
        // if (type === "ustensil") {
        //     divUst.appendChild(ptag)
        // } else if (type === "ustensil" && tagModif === "removeTag") {
        //     const tagToRemove = document.getElementById(`${clickFilter}`)
        //     divUst.remove(tagToRemove)
        // }


    if (type === "ingredient") {
        document.getElementById("ingredients").appendChild(div)
        document.getElementById("ingFilter").appendChild(ptag)
        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            // const tagToRemove = event.target.parentElement.id
            console.log(event, tagToRemove)
            // document.getElementById(tagToRemove).remove() 
            document.getElementById("jssearch").value = ""
            // modifOfListe(tagToRemove, type, "removeTag")
            searchFiltre()
        })
    } else if (type === "appareil") {
        document.getElementById("appareils").appendChild(div)
        document.getElementById("appFilter").appendChild(ptag)
        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            // const tagToRemove = event.target.parentElement.id
            console.log(event, tagToRemove)
            // document.getElementById(tagToRemove).remove()
            document.getElementById("jssearch").value = ""
            // modifOfListe(tagToRemove, type, "removeTag")
            searchFiltre()
        })
    } else if (type === "ustensil") {
        document.getElementById("ustensils").appendChild(div)
        document.getElementById("ustFilter").appendChild(ptag)

        img.addEventListener("click", function(event) {
            div.remove()
            ptag.remove()
            // const tagToRemove = event.target.parentElement.id
            // console.log(event, tagToRemove)
            document.getElementById("jssearch").value = ""
            // modifOfListe(tagToRemove, type, "removeTag")
            searchFiltre()
        })
    }
}


// function modifOfListe(clickFilter, type, tagModif){
//     let listeToModify = []
//     let listeTag = []
//     if(type === "ingredient") {
//         listeToModify = listeIngredients
//     } else if (type === "appareil") {
//         listeToModify = listeAppareils
//     } else if (type === "ustensil") {
//         listeToModify = listeUstensils
//     }

//     const allFilters = document.querySelectorAll('.pFilter')
//     if (tagModif === "activeTag"){
//     // listeTag = listetoModify.filter((liste) => liste == clickFilter)
//     allFilters.forEach((filter) => {
//         console.log(filter)
//         listeToModify = listeToModify.filter((liste) => liste !== filter.innerText)
//     })
//     console.log(listeToModify)
//     displayUnderInputFiltre(listeToModify, type, clickFilter, "activeTag")
//     } 
    
//     if (tagModif === "removeTag"){
//         clickFilter = ""
//         if(allFilters){
//         allFilters.forEach((filtre) => {
//             listeToModify = listeToModify.filter((liste) => liste !== filtre)
//         })
//         displayUnderInputFiltre(listeToModify, type, clickFilter, "removeTag")
//         }
//     }

// }


// Recherche spécifique 

function displayUnderInputFiltre(liste, type, clickFilter, tagModif) {
    const divIng = document.getElementById("ingFilter")
    const divApp = document.getElementById("appFilter")
    const divUst = document.getElementById("ustFilter")

    if(type === "ingredient") {
        divIng.innerHTML = ""
    } else if (type === "appareil") {
        divApp.innerHTML = ""
    } else if (type === "ustensil") {
        divUst.innerHTML = ""
    }
    console.log(liste)
    if(clickFilter){
        const ptag = document.createElement('p')
        ptag.classList.add(type + "tagFilter")
        ptag.setAttribute("id", `${clickFilter}`)
        ptag.textContent = clickFilter
        if(type === "ingredient" && tagModif === "activeTag") {
            divIng.appendChild(ptag)
        } else if (type === "ingredient" && tagModif === "removeTag") {
            const tagToRemove = document.getElementById(`${clickFilter}`)
            divUst.remove(tagToRemove)
        }
        
        if (type === "appareil" && tagModif === "activeTag") {
            divApp.appendChild(ptag)
        } else if (type === "appareil" && tagModif === "removeTag") {
            const tagToRemove = document.getElementById(`${clickFilter}`)
            divUst.remove(tagToRemove)
        }
        
        if (type === "ustensil" && tagModif === "activeTag") {
            divUst.appendChild(ptag)
        } else if (type === "ustensil" && tagModif === "removeTag") {
            const tagToRemove = document.getElementById(`${clickFilter}`)
            divUst.remove(tagToRemove)
        }
    }

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
            // modifOfListe(clickFilter, type, "activeTag")
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

