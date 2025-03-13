
// FAR STAMPARE I RISULTATI VOLI IN CONSOLE
// SUCCESSIVAMENTE CREARE UNA DIV POPOLATA PER OGNI RISULTATO 
// http://127.0.0.1:5500/ProgettiCorsoPHP/Volaria/www/Volaria/classes/example_api_response.json

//fetch(`${window.location.origin}/volaria/public/endpoints/get_flights_results.php?from=JFK&to=MIA&departure_date=2025-03-14&return_date=&travelers=1`)
fetch(`${window.location.origin}/volaria/classes/live.server.json`)
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
    const flightsContainer = document.querySelector('flights-list');

    const flightsList = data.data;
    for (let i=0; i<flightsList.length; i++) {

        const flightSegment = flightsList[i];
        console.log("--------------------------------");
        // 1) Partenza in HH:mm
        
        let date = new Date(flightSegment.itineraries[0].segments[0].departure.at);

        let hours = date.getHours(); 
        let minutes = date.getMinutes();

        // Display the result in HH:mm format
        console.log(`Partenza: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`);


        //2) Arrivo in HH:mm
        
        date = new Date(flightSegment.itineraries[0].segments[0].arrival.at);

        hours = date.getHours(); 
        minutes = date.getMinutes(); 

        // Display the result in HH:mm format
        console.log(`Arrivo: ${hours}:${minutes < 10 ? '0' + minutes : minutes}`);


        //3) Durata in HH:mm

        // Example of flight duration given by the API: PT3H17M
        // Use of a regular expression to extract the hours and minutes
        const regex = /PT(\d+)H(\d+)M/;
        const matches = flightSegment.itineraries[0].duration.match(regex);

        if (matches) {
            const hours = matches[1];
            const minutes = matches[2];
        
            // Display the result in HH:mm format
            console.log(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
        } else {
            console.log("Invalid time format for duration");
        }


        //4) Stops (n + durata HH:mm + iata)


        console.log("--------------------------------");
    }

/*
    data.forEach(flight => {

  
        const flightSegment = flight.data.itineraries[0].segments[0];
  
        console.log(`Partenza: ${flightSegment.departure.iataCode}`);
        console.log(`Arrivo: ${flightSegment.arrival.iataCode}`);
        console.log(`Durata: ${flightSegment.duration}`);
        

        /*
        const flightDiv = document.createElement('div');
        flightDiv.classList.add('flight');
        flightDiv.innerHTML = `
        <p>Flight from ${flight.from} to ${flight.to}</p>
        <p>Price: ${flight.price}</p>
        `;
        flightsContainer.appendChild(flightDiv);
        
    });
    */
})
//.catch(error => console.log('Error:', error));

