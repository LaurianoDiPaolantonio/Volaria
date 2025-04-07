
// fetch(`http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example4_api_response.json`)

// 2 stops flights for testing:
// fetch(`http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example5_api_response.json`)

//fetch(`${window.location.origin}/volaria/public/endpoints/get_flights_results.php?from=JFK&to=MIA&departure_date=2025-03-14&return_date=&travelers=1`)
/*
const urlParams = new URLSearchParams(window.location.search);
const apiUrl = `${window.location.origin}/volaria/public/endpoints/get_flights_results.php?` + urlParams.toString();
fetch(apiUrl)
*/

const loader = document.querySelector(".loader");
loader.style.display = "block";

const urlParams = new URLSearchParams(window.location.search);
const apiUrl = `${window.location.origin}/volaria/public/endpoints/get_flights_results.php?` + urlParams.toString();
fetch("http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example4_api_response.json")
.then(response => response.json())
.then(data => {
    console.log(data);

    // 

    const flightsContainer = document.querySelector('.flights-list');

    const flightsList = data.data;

    // To sort the results based on the user's selected preferences
    const sortSelect = document.getElementById("sort-flights-list");

    sortSelect.addEventListener("change", updateFlightsList);

    updateFlightsList();

    // Inside this function there's everything to populate the divs with flights results
    function updateFlightsList() {

        const sortBy = sortSelect.value;
        
        const sortedFlights = [...flightsList].sort((a, b) => {

            if (a.itineraries.length>1) {
                // Calculate the duration of depart and return
                return sortBy === "cheapest" ? a.price.grandTotal - b.price.grandTotal : (getSortDuration(a.itineraries[0].duration)+getSortDuration(a.itineraries[1].duration)) - (getSortDuration(b.itineraries[0].duration)+getSortDuration(b.itineraries[1].duration));
            } else {
                // Calculate the duration of one way trip
                return sortBy === "cheapest" ? a.price.grandTotal - b.price.grandTotal : getSortDuration(a.itineraries[0].duration) - getSortDuration(b.itineraries[0].duration);    
            }

        })

        // This is to reset flightsContainer when there's a change in the sort preferences
        flightsContainer.innerHTML = "";

        // Da fare for dinamico che parte da un numero e finisce ad un altro numero, mostrando un numero definito di risultati
        // Posso usare GET da php così anche selezionando un volo e tornando indietro si rimane sulla stessa pagina, se posso farlo senza ricaricare la pagina
        // Se voglio visualizzare es: 10 voli per pagina, faccio apparire un numero di pagine selezionabili uguali a:
        // numRisultati / 10
        for (let i=0; i < sortedFlights.length; i++) {

            const singleFlightResult = document.createElement("div");
            singleFlightResult.classList.add("single-flight-result");
            flightsContainer.appendChild(singleFlightResult);

            const itinerariesContainer = document.createElement("div");
            itinerariesContainer.classList.add("itineraries-container");
            singleFlightResult.appendChild(itinerariesContainer);


            // Once we have the flights sorted as we need them to be, we process and print the results
            const flightSegment = sortedFlights[i];

            // Iterates through each itinerary (departure and, if present, return).
            flightSegment.itineraries.forEach(intinerary => {

                let stopsList = ``;

                const singleItinerary = document.createElement("div");
                singleItinerary.classList.add("single-itinerary");
                itinerariesContainer.appendChild(singleItinerary);

                singleItinerary.setAttribute("data-departure-time", getTime(intinerary.segments[0].departure.at));

                // Get airlines full name from the iata code provided by the API
                fetch(`${window.location.origin}/volaria/public/endpoints/get_airlines.php?query=${intinerary.segments[0].carrierCode}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(airline => {
                        createAndAppendDiv(singleItinerary, "airlines-flights-list", airline.name);
                    });
                })
                .catch(error => console.error("Errore durante il fetch delle compagnie aeree:", error));

                // Scan the departure and arrival of each itinerary
                for (let i=0; i < intinerary.segments.length; i++) {

                    /*
                        Qui devo stampare la compagnia aerea prendendo il suo
                        iata code dal json in data[0].itineraries[0].segments[0].carrierCode

                        fare query con php e ritornare il nome della compagnia aerea
                    */

                    //console.log(`Airline: `+intinerary.segments[i].carrierCode);

                    //  If there are stops, takes the first departure and the last arrival
                    if (intinerary.segments.length > 1) {
                        if (i == 0) {

                            createDivWithTwoChildren(singleItinerary,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                            //console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                        } else {
                            // Populates an array with the airports where stops are made
                            stopsList += intinerary.segments[i].departure.iataCode + ` `;
                        } 
                        if (i == intinerary.segments.length-1) {

                            createDivWithTwoChildren(singleItinerary,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                            //console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                        }
                    } else {
                        // If the flight is direct, it takes the departure and arrival directly from the same index.

                        createDivWithTwoChildren(singleItinerary,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                        //console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                        createDivWithTwoChildren(singleItinerary,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                        //console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                    }
                }

                // Retrieves the flight duration. If there are layovers, get the number of stops along with the IATA airport codes.
                if (intinerary.segments.length == 1) {

                    const stopsText = document.createElement("span");
                    stopsText.textContent = `Direct`;
                    stopsText.style.color = "green";

                    singleFlightResult.setAttribute("data-stops", "0")

                    createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list",stopsText);


                } else if (intinerary.segments.length == 2) {

                    const stopsText = document.createElement("span");
                    stopsText.textContent = `1 stop`;
                    stopsText.style.color = "red";

                    const fullStopsContainer = document.createElement("span");
                    fullStopsContainer.appendChild(stopsText);
                    fullStopsContainer.append(` ` + intinerary.segments[0].arrival.iataCode);

                    singleFlightResult.setAttribute("data-stops", "1")

                    createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list",fullStopsContainer);


                } else if (intinerary.segments.length > 2) {

                    const stopsText = document.createElement("span");
                    stopsText.textContent = `${intinerary.segments.length-1} stops`;
                    stopsText.style.color = "red";

                    const fullStopsContainer = document.createElement("span");
                    fullStopsContainer.appendChild(stopsText);
                    fullStopsContainer.append(` ` + stopsList)

                    singleFlightResult.setAttribute("data-stops", "2")

                    createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list",fullStopsContainer);

                }
                
            });

            createDivSelectFlight(singleFlightResult,"priceContainer-flights-list","price-flights-list",flightSegment.price.grandTotal+"€","buttonSelect-flights-list","Select",flightSegment.id);

        }

        loader.style.display = "none";

    }

});



/* ======== To filter flights based on number of stops through checkboxes (direct, 1 stop, 2+ stops) ======== */

document.querySelectorAll('.filter').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const selectedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(cb => cb.value);
      filterFlights(selectedFilters);
    });
});

function filterFlights(filters) {

    const flights = document.querySelectorAll('.single-flight-result');

    if (filters.length === 0) {
        flights.forEach(flight => {
            flight.style.display = '';
        });
        return;
    }

    flights.forEach(flight => {
        const stops = flight.getAttribute('data-stops');
        if (filters.includes(stops)) {
            flight.style.display = '';
        } else {
            flight.style.display = 'none';
        }
    });
}



/* ======== Range slider for filtering departure times based on selected preferences by the user, using noUiSlider ========*/

const slider = document.getElementById('departureSlider');
const label = document.getElementById('timeRangeLabel');

noUiSlider.create(slider, {
  start: [0, 23],
  connect: true,
  step: 1,
  range: {
    'min': 0,
    'max': 23
  },
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

slider.noUiSlider.on('update', (values) => {
  const [min, max] = values.map(Number);
  label.textContent = `${String(min).padStart(2, '0')}:00 - ${String(max).padStart(2, '0')}:00`;
  filterByTime(min, max);
});

function filterByTime(min, max) {

    // Select all the divs containing the itineraries
    const flightResults = document.querySelectorAll('.single-flight-result');

    flightResults.forEach(result => {

        // Iterate through the results to check if the departure time is within the selected time range

        const itineraries = result.querySelectorAll(".single-itinerary");
        let checkDisplay = true;

        itineraries.forEach(intinerary => {

            const hourStr = intinerary.getAttribute('data-departure-time')
            const hour = parseInt(hourStr.split(":")[0]);
            
            if (hour < min || hour > max) {
                checkDisplay = false;
            }
        });

        // If one of the itineraries is not within the time range, the result is not displayed
        if (checkDisplay) {
            result.style.display = '';
        } else {
            result.style.display = 'none';
        }

    });

}




/* ======== Functions to populate the divs with flights results ========*/

// To get the time from "YYYY-MM-DDTHH:mm:ss" to "HH:mm"    e.g."2025-04-28T13:00:00" to "13:00"
function getTime(dateTime) {

    const date = new Date(dateTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);

}

// To get the duration from e.g."PT22H40M" to "22h 40". Used for display
function getDuration(durationTime) {

    const regex = /PT(\d+)H(?:([\d]+)M)?/;
    const matches = durationTime.match(regex);
    
    if (matches) {
        const hours = matches[1];
        const minutes = matches[2] || "00";
    
        return `${hours}h ${minutes.padStart(2, '0')}`;
    } else {
        return ("Invalid time format for duration");
    }

}

// Returns the duration (e.g."PT22H40M") in minutes. Used for sorting
function getSortDuration(durationTime) {
    const match = durationTime.match(/PT(\d+H)?(\d+M)?/); 
    const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
    const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
    return hours * 60 + minutes;
}

// To create a single div with a class and populate it with content. Appends it to the selected parent element
function createAndAppendDiv(parentElement, className, content, ) {

    const newDiv = document.createElement("div");
    newDiv.classList.add(className);
    newDiv.textContent = content;
    
    if (newDiv) {
        parentElement.appendChild(newDiv);
    } else {
        console.error(`div ${className} empty`);
    }
}

// Same as the single div function but with two child divs inside a parent div
function createDivWithTwoChildren(parentElement, parentClass, childClass1, childContent1, childClass2, childContent2) {

    // Creation of the main div
    const parentDiv = document.createElement("div");
    parentDiv.classList.add(parentClass);

    // Creation of the first child div
    const childDiv1 = document.createElement("div");
    childDiv1.classList.add(childClass1);
    childDiv1.textContent = childContent1;

    // Creation of the second child div
    const childDiv2 = document.createElement("div");
    childDiv2.classList.add(childClass2);
    appendContent(childDiv2, childContent2);

    // Adding the child divs to the main div
    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);

    // Adding the main div to the parent element in the DOM
    parentElement.appendChild(parentDiv);

}

// Helper to accept strings or DOM nodes
function appendContent(element, content) {
    if (typeof content === "string") {
        element.textContent = content;
    } else if (content instanceof Node) {
        element.appendChild(content);
    }
}

// Sets each singleFlightResult div to redirect on click to the selected flight, retrieving the search parameters and the flight ID of that search
function createDivSelectFlight(parentElement, parentClass, childClass1, childContent1, childClass2, childContent2,id_flight) {
    
    const parentDiv = document.createElement("div");
    parentDiv.classList.add(parentClass);

    const childDiv1 = document.createElement("div");
    childDiv1.classList.add(childClass1);
    childDiv1.textContent = childContent1;

    const childDiv2 = document.createElement("div");
    childDiv2.classList.add(childClass2);
    childDiv2.setAttribute("id_flight", id_flight);
    childDiv2.textContent = childContent2;

    document.addEventListener("click", function (event) {

        if (event.target.closest(".single-flight-result")) {

            let singleFlightResult = event.target.closest(".single-flight-result");

            let selectDiv = singleFlightResult.querySelector(".buttonSelect-flights-list");
            let flightId = selectDiv.getAttribute("id_flight");
            
            if (flightId) {
                let urlParams = new URLSearchParams(window.location.search);
                window.location.href = `flight-details.php?flight_id=${flightId}&${urlParams.toString()}`;
            }

        }
    });

    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);

    parentElement.appendChild(parentDiv);

}




