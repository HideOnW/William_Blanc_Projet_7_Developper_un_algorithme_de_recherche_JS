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


const listeIngredients = []

function getIngredient() {
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


const listeAppareils = []

function getAppareil() {
    recipes.forEach((recipe) => {
        if (!listeAppareils.includes(recipe.appliance)) {
            listeAppareils.push(recipe.appliance)
        }
    })
    displayUnderInputFiltre(listeAppareils, "appareil")

}


const listeUstensils = []

function getUstensils() {
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            const ust = ustensil.toLocaleLowerCase()
            if (!listeUstensils.includes(ust)) {
                listeUstensils.push(ust)
            }
        })
    })
    displayUnderInputFiltre(listeUstensils, "ustensil")

}




// Recherche Barre principale

function displayUnderInputFiltre(liste,type) {
    const divIng = document.getElementById("ingFilter")
    const divApp = document.getElementById("appFilter")
    const divUst = document.getElementById("ustFilter")
    liste.forEach((data) => {
        const p = document.createElement('p')
        p.textContent = data
        if(type === "ingredient") {
            divIng.appendChild(p)
        } else if (type === "appareil") {
            divApp.appendChild(p)
        } else if (type === "ustensil") {
            divUst.appendChild(p)
        }
    })
}



function searchFiltre() {
    console.log("yes")
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
        error.innerHTML = "Aucune recettes trouvé"
        document.getElementById("recettes").appendChild(error)
        document.getElementById("inputsearch").style.display = "none";
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
    listeIngredients.forEach((ingredient) => {
        if (ingredient.toLowerCase().includes(inputV)) {
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
            document.getElementById("jssearch").value = clickFilter
            document.getElementById("inputsearch").style.display = "none";
            searchFiltre()
            displayFiltre(clickFilter, result.type)
        })
    })
}



function displayFiltre(clickFilter, type) {
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


    if (type === "ingredient") {
        document.getElementById("ingredients").appendChild(div)
        img.addEventListener("click", () => {
            document.getElementById("ingredients").removeChild(div)
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    } else if (type === "appareil") {
        document.getElementById("appareils").appendChild(div)
        img.addEventListener("click", () => {
            document.getElementById("appareils").removeChild(div)
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    } else if (type === "ustensil") {
        document.getElementById("ustensils").appendChild(div)
        img.addEventListener("click", () => {
            document.getElementById("ustensils").removeChild(div)
            document.getElementById("jssearch").value = ""
            searchFiltre()
        })
    }
}


// Recherche spécifique 

const ingInput = document.querySelector('.ingInput')
const appInput = document.querySelector('.appInput')
const ustInput = document.querySelector('.ustInput')

ingInput.addEventListener('input', function() {
    searchInput(ingInput, listeIngredients, "appareil")
})


appInput.addEventListener('input', function() {
    searchInput(appInput, listeAppareils, "appareil")
})

ustInput.addEventListener('input', function() {
    searchInput(ustInput, listeUstensils, "ustensil")
})


function searchInput(input, liste, type) {
    const inputV = input.value.toLowerCase()
    console.log(inputV, liste)
    console.log("test")

    const searchListe = liste.filter((result) => result.toLowerCase().includes(inputV))

    console.log(searchListe)
    displayUnderInputFiltre(searchListe, type)
}

//Affichage des données

async function displayData(recipesToDisplay) {

    const recettesSection = document.getElementById("recettes")

    const recipesFiltered =  filterRecipe(recipesToDisplay)

    recipesFiltered.forEach((recipes) => {
        const recetteCardDom = getrecetteCardDom(recipes);
        recettesSection.appendChild(recetteCardDom)
    })
}

async function init() {
    getIngredient(recipes)
    getAppareil(recipes)
    getUstensils(recipes)
    displayData(recipes)
    getRecipes()
}


init()

