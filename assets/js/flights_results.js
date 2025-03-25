
// FAR STAMPARE I RISULTATI VOLI IN CONSOLE ✅
// SUCCESSIVAMENTE CREARE UNA DIV POPOLATA PER OGNI RISULTATO 
// http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example_api_response.json

//fetch(`${window.location.origin}/volaria/public/endpoints/get_flights_results.php?from=JFK&to=MIA&departure_date=2025-03-14&return_date=&travelers=1`)
fetch(`http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example4_api_response.json`)
.then(response => response.json())
.then(data => {
    console.log(data);

    /*
        INFO I NEED:
        1) Partenza in HH:mm
        2) Arrivo in HH:mm
        3) Durata in HH:mm
        4) Stops (n + durata HH:mm + iata)
        5) Entrambi Aeroporti Iata 
        6) Airlines
        7) prezzo
    */
    const flightsContainer = document.querySelector('.flights-list');

    const flightsList = data.data;

    // Da fare for dinamico che parte da un numero e finisce ad un altro numero, mostrando un numero definito di risultati
    for (let i=0; i < 5; i++) {

        const flightSegment = flightsList[i];
        console.log("--------------------------------");

        // Si passa per ogni itinerario (andata e ,se c'è, ritorno) 
        flightSegment.itineraries.forEach(intinerary => {

            let stopsList = [];

            createAndAppendDiv(flightsContainer, "airlines-flights-list", intinerary.segments[0].carrierCode);

            // Si stampano partenza e arrivo di ogni itinerario
            for (let i=0; i < intinerary.segments.length; i++) {

                /*
                    Qui devo stampare la compagnia aerea prendendo il suo
                    iata code dal json in data[0].itineraries[0].segments[0].carrierCode

                    fare query con php e ritornare il nome della compagnia aerea
                */

                //createAndAppendDiv(flightsContainer, "airlines-flights-list", intinerary.segments[i].carrierCode);

                console.log(`Airline: `+intinerary.segments[i].carrierCode);

                //  se ci sono stops si prende prima partenza e ultimo arrivo
                if (intinerary.segments.length > 1) {
                    if (i == 0) {

                        createDivWithTwoChildren(flightsContainer,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                        /*
                        createAndAppendDiv(flightsContainer, "departure-flights-list", getTime(intinerary.segments[i].departure.at));
                        const departureDiv = document.querySelector(".departure-flights-list");
                        createAndAppendDiv(departureDiv, "iata-departure-flights-list", intinerary.segments[i].departure.iataCode);
                        */

                        console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                    } else {
                        // Si popola un array con gli aeroporti dove si fa stop
                        stopsList.push(intinerary.segments[i].departure.iataCode);
                    } 
                    if (i == intinerary.segments.length-1) {

                        createDivWithTwoChildren(flightsContainer,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                        console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                    }
                } else {
                    // se è diretto di prende partenza e arrivo direttamente dallo stesso indice

                    createDivWithTwoChildren(flightsContainer,"departureContainer-flights-list","departure-flights-list", getTime(intinerary.segments[i].departure.at),"iata-departure-flights-list",intinerary.segments[i].departure.iataCode);

                    console.log(`Partenza: ${getTime(intinerary.segments[i].departure.at)} ${intinerary.segments[i].departure.iataCode}`);

                    createDivWithTwoChildren(flightsContainer,"arrivalContainer-flights-list","arrival-flights-list", getTime(intinerary.segments[i].arrival.at),"iata-arrival-flights-list",intinerary.segments[i].arrival.iataCode);

                    console.log(`Arrivo: ${getTime(intinerary.segments[i].arrival.at)}`+` ${intinerary.segments[i].arrival.iataCode}`);
                }
            }

            // DA METTERE IN DIV QUESTA SEZIONE

            // Si prende durata del volo, in caso di scali si prende numero di scali con aeroporto/i iata

            if (intinerary.segments.length == 1) {
                console.log(`Diretto ${getDuration(intinerary.duration)}`);
            } else if (intinerary.segments.length == 2) {
                console.log(`1 stop ${intinerary.segments[0].arrival.iataCode} ${getDuration(intinerary.duration)}`);
            } else if (intinerary.segments.length > 2) {
                // Si stampa il numero di stops e tutti gli aeroporti dove vengono fatti
                console.log(`${intinerary.segments.length-1} stops`);
                stopsList.forEach(stop => {

                   console.log(stop);
                    
                });
            }

            /*
                ADESSO CHE STAMPA TUTTO QUELLO CHE MI SERVE, DEVO FARE I DIV ED ORGANIZZARE LA GRAFICA
            */
            
        });

        console.log("Prezzo: "+flightSegment.price.grandTotal+"€");


    }
});

function getTime(dateTime) {

    const date = new Date(dateTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);

}

function getDuration(durationTime) {

    const regex = /PT(\d+)H(?:([\d]+)M)?/;
    const matches = durationTime.match(regex);
    
    if (matches) {
        const hours = matches[1];
        const minutes = matches[2] || "00";
    
        // Display the result in HH:mm format
        return `${hours}:${minutes.padStart(2, '0')}`;
    } else {
        return ("Invalid time format for duration");
    }

}

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

function createDivWithTwoChildren(parentElement, parentClass, childClass1, childContent1, childClass2, childContent2) {
    // Creazione del div principale
    const parentDiv = document.createElement("div");
    parentDiv.classList.add(parentClass);

    // Creazione della prima div figlia
    const childDiv1 = document.createElement("div");
    childDiv1.classList.add(childClass1);
    childDiv1.textContent = childContent1;

    // Creazione della seconda div figlia
    const childDiv2 = document.createElement("div");
    childDiv2.classList.add(childClass2);
    childDiv2.textContent = childContent2;

    // Aggiunta delle div figlie alla div principale
    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);

    // Aggiunta della div principale all'elemento padre nel DOM
    parentElement.appendChild(parentDiv);
}
