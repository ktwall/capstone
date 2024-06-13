const API_URL = 'https://demo6939126.mockable.io/api/weather';

// Fetch weather data from the API
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

// Populate table rows with weather data
async function populateWeatherTable() {
    const tableBody = document.getElementById("weatherData");
    const weatherData = await fetchWeatherData();

    weatherData.forEach(city => {
        const row = document.createElement("tr");

        // Example
        const daysToTrip = "10 days out";
        const tripName = city.location;
        const details = "+"; // Placeholder for details
        const weather = city.forecast.find(day => day.date === "2024-06-01");

        // Create table cells (td) and populate with data
        const daysToTripCell = document.createElement("td");
        daysToTripCell.textContent = daysToTrip;

        const tripNameCell = document.createElement("td");
        tripNameCell.textContent = tripName;

        const detailsCell = document.createElement("td");
        detailsCell.textContent = details;

        const weatherCell = document.createElement("td");
        weatherCell.textContent = `${weather.temperature}°F ${weather.condition}`;

        // Append cells to the row
        row.appendChild(daysToTripCell);
        row.appendChild(tripNameCell);
        row.appendChild(detailsCell);
        row.appendChild(weatherCell);

        // Append row to the table
        tableBody.appendChild(row);
    });
}

// Call function to populate the table on page load
populateWeatherTable();
