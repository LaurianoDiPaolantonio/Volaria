
/* ============ RICERCA AEROPORTI, CITTA ============= */

// Si interroga il database tramite fetch_API/search_flight_form.php

// Da aggiungere: caratteri combacianti in grassetto

setupAutocomplete("departure", "autocomplete-departure");
setupAutocomplete("arrival", "autocomplete-arrival");
closeListIfOut("departure", "autocomplete-departure");
closeListIfOut("arrival", "autocomplete-arrival");

function setupAutocomplete(inputId, listId) {

    document.getElementById(inputId).addEventListener("input", async function() {

        // Si mette la ricerca utente in "query" e la div da popolare con risultati in sottodiv in "list"
        let query = this.value.trim();
        let list = document.getElementById(listId);
        list.innerHTML = "";

        // Non far niente finquando i caratteri digitati sono minori di 3
        if (query.length < 3) return;

        // Dopo il 3° carattere digitato dall'utente, si incomincia ad interrograre il database
        try {
            let response = await fetch(`http://localhost:4500/volaria/fetch_API/search_flight_form.php?query=${query}`);
            let data = await response.json();

            data.forEach(airport => {

                // Si crea una sottodiv per ogni risultato e si popola il testo
                let div_child = document.createElement("div");
                div_child.classList.add("autocomplete-item");

                // si aggiunge al risultato di ricerca
                div_child.textContent = airport.name+" ("+airport.iata_code+")";

                // Se city non è null, si aggiunge al risultato di ricerca stylizzato successivamente da CSS
                if (airport.city) {

                    let city = document.createElement("span");
                    city.classList.add("city-autocomplete-item");
                    city.textContent = airport.city;
                    div_child.appendChild(city);
                }
                
                // Si aggiunge la sottodiv popolata
                list.appendChild(div_child);
                

                // Al click su una sottodiv, il valore di tale div viene trasferito alla div padre dove si digita la ricerca
                // Le sottodiv vengono svuotate
                div_child.addEventListener("click", () => {
                    document.getElementById(inputId).value = div_child.textContent;
                    list.innerHTML = "";
                });


            });
        } catch (error) {
            console.error("Errore durante il fetch degli aeroporti:", error);
        }
    });
}

// Per chiudere la lista se l'utente clicca fuori
function closeListIfOut (inputId, listId) {
    
    document.addEventListener("click", function(e) {
        if (!document.getElementById(inputId).contains(e.target)) {
            document.getElementById(listId).innerHTML = "";
        }
    });

}



