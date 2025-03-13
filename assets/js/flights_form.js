
/* ============ RICERCA AEROPORTI, CITTA ============= */

// The database is queried via public/endpoints/get_airports.php

// Da aggiungere: caratteri combacianti in grassetto


setupAutocomplete("departure", "autocomplete-departure", "departure-iata");
setupAutocomplete("arrival", "autocomplete-arrival", "arrival-iata");


// To display results based on the user's search
function setupAutocomplete(inputId, listId, iata_codeId) {

    document.getElementById(inputId).addEventListener("input", async function() {

        // The user's search is placed in "query" and the div to be populated with results is placed in "list"
        let query = this.value.trim();
        let list = document.getElementById(listId);
        list.innerHTML = "";

        // Do nothing until the number of characters typed is less than 3
        if (query.length < 3) return;

        // After the 3rd character typed by the user, the database query starts
        try {
            let response = await fetch(`${window.location.origin}/volaria/public/endpoints/get_airports.php?query=${query}`);
            let data = await response.json();

            data.forEach(airport => {

                // A sub-div is created for each result, and populated
                let div_child = document.createElement("div");
                div_child.classList.add("autocomplete-item");

                // The search result is added to the sub-div
                div_child.textContent = airport.name+" ("+airport.iata_code+")";

                // If city from the DB is not null, it is added to the search results, which are styled later by CSS
                if (airport.city) {

                    let city = document.createElement("span");
                    city.classList.add("city-autocomplete-item");
                    city.textContent = airport.city;
                    div_child.appendChild(city);

                }
                
                // The populated sub-div is added
                list.appendChild(div_child);
                

                // When clicking on a sub-div, the value of that div is transferred to the parent div
                // The sub-divs are cleared
                div_child.addEventListener("click", () => {
                    document.getElementById(inputId).value = div_child.textContent;
                    list.innerHTML = "";

                    // To send only the airport IATA code via GET, I insert the value into a hidden input
                    document.getElementById(iata_codeId).value = airport.iata_code;
                });

            });
        } catch (error) {
            console.error("Errore durante il fetch degli aeroporti:", error);
        }

    });

    // To close the list when the user clicks outside
    document.addEventListener("click", function(e) {
        if (!document.getElementById(inputId).contains(e.target)) {
            document.getElementById(listId).innerHTML = "";
        }
    });
    
}


// To send only iata_code, date, and travelers via GET
document.querySelector(".search_flights").addEventListener("submit", (event) => {

    event.preventDefault();

    const fromIATA = document.getElementById("departure-iata").value;
    const toIATA = document.getElementById("arrival-iata").value;
    const departureDate = document.getElementById("departure-date").value;
    const returnDate = document.getElementById("return-date").value;
    const travelers = document.getElementById("travelers").value;

    const url = `flights-results.php?from=${encodeURIComponent(fromIATA)}&to=${encodeURIComponent(toIATA)}&departure_date=${encodeURIComponent(departureDate)}&return_date=${encodeURIComponent(returnDate)}&travelers=${encodeURIComponent(travelers)}`;

    window.location.href = "../pages/"+url;
});

// Displays today's date in the departure_date input
document.getElementById("departure-date").value = new Date().toISOString().split('T')[0];