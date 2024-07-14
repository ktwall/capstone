const API_URL = 'https://demo6939126.mockable.io/api/weather'; 

// Array - stored trips
let storedTrips = [];

// Fetch weather data (API)
async function fetchWeatherData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
}

// Populate - city dropdown with options
async function populateCityDropdown(weatherData) {
    const citySelect = document.getElementById("citySelect");

    weatherData.forEach(city => {
        const option = document.createElement("option");
        option.value = city.location;
        option.textContent = city.location;
        citySelect.appendChild(option);
    });
}

// Populate - table rows with weather data for index (home page)
async function populateWeatherTable() {
    const tableBody = document.querySelector("#weatherData tbody");
    const weatherData = await fetchWeatherData();

    // Add - existing trips 
    storedTrips.forEach(trip => {
        updateWeatherTable(trip);
    });

    // Add - new trips from API
    weatherData.forEach(city => {
        const daysToTrip = "10 days out"; //placeholder
        const newTrip = {
            location: city.location,
            daysToTrip: daysToTrip,
            details: city.details ? city.details : '+',
            forecast: city.forecast.length > 0 ? city.forecast : [{ temperature: 'N/A', condition: 'N/A' }]
        };

        // UI - trip
        updateWeatherTable(newTrip);

        // Store trip 
        storedTrips.push(newTrip);
    });

    await populateCityDropdown(weatherData); // Dropdown for added notes
}
// ** The below was removed as I could not get the code to work **
// // Function - save a new trip locally (simulated backend)
// function saveNewTripLocally(newTrip) {
//     storedTrips.push(newTrip);
//     localStorage.setItem('storedTrips', JSON.stringify(storedTrips));
// }

// // Function - save a new trip
// function saveNewTrip(event) {
//     event.preventDefault(); // Prevent - form submission
//     const tripNameInput = document.getElementById("tripName").value;
//     const daysToTripInput = document.getElementById("daysToTrip").value;
//     const weatherInput = document.getElementById("weather").value;

//     const newTrip = {
//         location: tripNameInput,
//         daysToTrip: daysToTripInput,
//         details: '', // "+"" equivalent if on index.html
//         forecast: [{ temperature: 'N/A', condition: 'N/A' }] // Placeholder
//     };

//     // Saving new trip
//     saveNewTripLocally(newTrip);

//     // UI with new trip
//     updateWeatherTable(newTrip);

//     alert(`Trip "${tripNameInput}" added successfully!`);
//     document.getElementById("addTripForm").reset(); // Reset - after submission
// }

// Function - update weather table UI 
function updateWeatherTable(newTrip) {
    const tableBody = document.querySelector("#weatherData tbody");
    const row = document.createElement("tr");

    // Calculate - days to trip (placeholder)
    const daysToTrip = newTrip.daysToTrip + "";

    // Create table cells - populate with data
    const daysToTripCell = document.createElement("td");
    daysToTripCell.textContent = daysToTrip;

    const tripNameCell = document.createElement("td");
    tripNameCell.textContent = newTrip.location;

    const detailsCell = document.createElement("td");
    detailsCell.textContent = newTrip.details ? newTrip.details : '+';

    const weatherCell = document.createElement("td");
    weatherCell.textContent = `${newTrip.forecast[0].temperature}°F ${newTrip.forecast[0].condition}`;

    // Append cells - row
    row.appendChild(daysToTripCell);
    row.appendChild(tripNameCell);
    row.appendChild(detailsCell);
    row.appendChild(weatherCell);

    // Append row - table body
    tableBody.appendChild(row);
}

// Event listener - Save Trip 
document.getElementById("addTripForm").addEventListener("submit", saveNewTrip);

// Event listener - menu icon to toggle mobile menu
document.querySelector('.menu-icon').addEventListener('click', function() {
    var mobileLinks = document.querySelector('.mobile-links');
    mobileLinks.classList.toggle('active');
});

// Call function - populate weather table and dropdown 
populateWeatherTable();
