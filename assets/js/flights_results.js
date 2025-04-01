
// fetch(`http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example4_api_response.json`)

//fetch(`${window.location.origin}/volaria/public/endpoints/get_flights_results.php?from=JFK&to=MIA&departure_date=2025-03-14&return_date=&travelers=1`)
/*
const urlParams = new URLSearchParams(window.location.search);
const apiUrl = `${window.location.origin}/volaria/public/endpoints/get_flights_results.php?` + urlParams.toString();
fetch(apiUrl)
*/

const urlParams = new URLSearchParams(window.location.search);
const apiUrl = `${window.location.origin}/volaria/public/endpoints/get_flights_results.php?` + urlParams.toString();
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data);

    const flightsContainer = document.querySelector('.flights-list');

    const flightsList = data.data;

    // Da fare for dinamico che parte da un numero e finisce ad un altro numero, mostrando un numero definito di risultati
    // Posso usare GET da php così anche selezionando un volo e tornando indietro si rimane sulla stessa pagina, se posso farlo senza ricaricare la pagina
    // Se voglio visualizzare es: 10 voli per pagina, faccio apparire un numero di pagine selezionabili uguali a:
    // numRisultati / 10
    for (let i=0; i < 5; i++) {

        const singleFlightResult = document.createElement("div");
        singleFlightResult.classList.add("single-flight-result");
        flightsContainer.appendChild(singleFlightResult);

        const itinerariesContainer = document.createElement("div");
        itinerariesContainer.classList.add("itineraries-container");
        singleFlightResult.appendChild(itinerariesContainer);



        const flightSegment = flightsList[i];
        console.log("--------------------------------");

        // Iterate through each itinerary (departure and, if present, return).
        flightSegment.itineraries.forEach(intinerary => {

            let stopsList;

            const singleItinerary = document.createElement("div");
            singleItinerary.classList.add("single-itinerary");
            itinerariesContainer.appendChild(singleItinerary);

            createAndAppendDiv(singleItinerary, "airlines-flights-list", intinerary.segments[0].carrierCode);

            // Scan the departure and arrival of each itinerary
            for (let i=0; i < intinerary.segments.length; i++) {

                /*
                    Qui devo stampare la compagnia aerea prendendo il suo
                    iata code dal json in data[0].itineraries[0].segments[0].carrierCode

                    fare query con php e ritornare il nome della compagnia aerea
                */

                console.log(`Airline: `+intinerary.segments[i].carrierCode);

                //  If there are stops, takes the first departure and the last arrival
                if (intinerary.segments.length > 1) {
                    if (i == 0) {

                        createDivWithTwoChildren(singleItinerary,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                        console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                    } else {
                        // Populates an array with the airports where stops are made
                        stopsList += intinerary.segments[i].departure.iataCode + " ";
                    } 
                    if (i == intinerary.segments.length-1) {

                        createDivWithTwoChildren(singleItinerary,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                        console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                    }
                } else {
                    // If the flight is direct, it takes the departure and arrival directly from the same index.

                    createDivWithTwoChildren(singleItinerary,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                    console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                    createDivWithTwoChildren(singleItinerary,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                    console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                }
            }

            // Retrieves the flight duration. If there are layovers, get the number of stops along with the IATA airport codes.
            if (intinerary.segments.length == 1) {

                createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list","Direct");

                console.log(`Diretto ${getDuration(intinerary.duration)}`);

            } else if (intinerary.segments.length == 2) {

                createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list","1 stop "+intinerary.segments[0].arrival.iataCode);

                console.log(`1 stop ${intinerary.segments[0].arrival.iataCode} ${getDuration(intinerary.duration)}`);

            } else if (intinerary.segments.length > 2) {

                createDivWithTwoChildren(singleItinerary,"stopsContainer-flights-list","duration-flights-list",getDuration(intinerary.duration),"stops-flights-list",intinerary.segments.length-1+" stops "+stopsList);

                // Prints the number of stops and all the airports where they occur
                console.log(`${intinerary.segments.length-1} stops`);
                console.log(stopsList);
            }
            
        });

        createDivSelectFlight(singleFlightResult,"priceContainer-flights-list","price-flights-list",flightSegment.price.grandTotal+"€","buttonSelect-flights-list","Select",flightSegment.id);

        console.log("Prezzo: "+flightSegment.price.grandTotal+"€");


    }
});

// To get the time from "YYYY-MM-DDTHH:mm:ss" to "HH:mm"    e.g."2025-04-28T13:00:00" to "13:00"
function getTime(dateTime) {

    const date = new Date(dateTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);

}

// To get the duration from e.g."PT22H40M" to "22h 40"
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
    childDiv2.textContent = childContent2;

    // Adding the child divs to the main div
    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);

    // Adding the main div to the parent element in the DOM
    parentElement.appendChild(parentDiv);

}

// DA MODIFICARE. DEVO PRENDERE I PARAMETRI DALL'URL E TRASFERIRLI ALLA PAGINA DI DETTAGLIO DEL VOLO SELEZIONATO (urlParams)
function createDivSelectFlight(parentElement, parentClass, childClass1, childContent1, childClass2, childContent2,id_flight,iata_departure,iata_arrival,depart_date,return_date,travelers) {
    
    const parentDiv = document.createElement("div");
    parentDiv.classList.add(parentClass);

    
    const childDiv1 = document.createElement("div");
    childDiv1.classList.add(childClass1);
    childDiv1.textContent = childContent1;

    
    const childDiv2 = document.createElement("div");
    childDiv2.classList.add(childClass2);
    childDiv2.dataset.id_flight = id_flight;
    childDiv2.dataset.iata_departure = iata_departure;
    childDiv2.dataset.iata_arrival = iata_arrival;
    childDiv2.dataset.depart_date = depart_date;
    childDiv2.dataset.travelers = travelers;
    if (return_date) {
        childDiv2.dataset.return_date = return_date;
    }
    childDiv2.textContent = childContent2;

    
    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);

    parentElement.appendChild(parentDiv);

}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".buttonSelect-flights-list").forEach(button => {
        button.addEventListener("click", function () {
            // Gets the parent div that contains the flight data
            let volo = this.parentElement;  
            let id = volo.dataset.id;
            let company = volo.dataset.company;
            let price = volo.dataset.price;

            // Redirects to the detail page with the data in the query string
            window.location.href = `dettaglio.html?id=${id}&company=${company}&price=${price}`;
        });
    });
});


