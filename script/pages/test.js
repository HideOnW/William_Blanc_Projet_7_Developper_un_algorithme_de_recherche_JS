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
            document.getElementById("jssearch").value = clickFilter
            document.getElementById("inputsearch").style.display = "none";
            searchFiltre()
            displayFiltre(clickFilter, result.type)
            modifOfListe(clickFilter, result.type)
            }
        })

         results.push(ing)