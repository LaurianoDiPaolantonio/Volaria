
/* ---------------- BURGER MENU -------------- */

// Toggle of the burger menu
$('button.burger-menu').click(function() {

    $('.burger').toggleClass('open');

});

// Closes the menu if the user clicks outside
$(document).click(function(event) {
    if (!$(event.target).closest('.burger, .burger-menu').length) {
        $('.burger').removeClass('open');
    }
});


/* --------------- HOMEPAGE SEARCH FORM ----------------- */

// Displays today's date in the departure_date input
document.getElementById("departure_date").value = new Date().toISOString().split('T')[0];


/* TEST */

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const form = new FormData(event.target);
        const params = new URLSearchParams(form);

        fetch("../pages/test.php?" + params.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error with the server request!");
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data);

                if (!Array.isArray(data)) {
                    console.error("❌ The server returned:", data);
                    throw new Error("The response is not an array!");
                }

                data.forEach(flight => {
                    const flightDiv = document.createElement('div');
                    flightDiv.classList.add('flight');
                    flightDiv.innerHTML = `
                        <p>Flight from ${flight.from} to ${flight.to}</p>
                        <p>Price: ${flight.price}</p>
                    `;
                    flightsContainer.appendChild(flightDiv);
                });
            })
        .catch(error => console.error("Error fetching data:", error));
    });
});

/*
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const form = new FormData(event.target);
        const params = new URLSearchParams(form);

        // Usa Fetch per inviare una richiesta al server con i parametri di ricerca
        fetch("../pages/test.php?" + params.toString())
            .then(response => response.json())
            .then(data => {
                // Pulisci i risultati precedenti
                const flightsContainer = document.getElementById('flights');
                flightsContainer.innerHTML = '';

                // Visualizza i risultati nella pagina
                data.forEach(flight => {
                    const flightDiv = document.createElement('div');
                    flightDiv.classList.add('flight');
                    flightDiv.innerHTML = `
                        <p>Flight from ${flight.from} to ${flight.to}</p>
                        <p>Price: ${flight.price}</p>
                    `;
                    flightsContainer.appendChild(flightDiv);
                });
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    });
});
*/




