

fetch('http://localhost:4500/volaria/pages/test.php?from=JFK&to=MIA&departure_date=2025-03-09&return_date=&travelers=1')
.then(response => response.json())
.then(data => {
const flightsContainer = document.getElementById('flights');
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
.catch(error => console.log('Error:', error));

