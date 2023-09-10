// Your Google Maps API Key
const apiKey = 'YAIzaSyDQPVEYxKO6wJvkesc9ZgT4aK2qbHlK8iQ';

// Initialize the map
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2, // Adjust the zoom level as needed
        center: { lat: 0, lng: 0 }, // Center the map as needed
    });

    // Fetch data from NASA API
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&category=wildfires')
        .then((response) => response.json())
        .then((data) => {
            // Loop through the wildfire events
            data.events.forEach((event) => {
                const coordinates = event.geometries[0].coordinates;
                const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates[1], coordinates[0]),
                    map: map,
                    title: event.title,
                });

                // Add an info window to the marker
                const infowindow = new google.maps.InfoWindow({
                    content: `<strong>${event.title}</strong><br>Date: ${new Date(event.geometries[0].date).toLocaleDateString()}`
                });

                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            });
        })
        .catch((error) => {
            console.error('Error fetching NASA data:', error);
        });
}

// Load the Google Maps JavaScript API with your API Key
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    document.body.appendChild(script);
}

// Load the Google Maps API when the page loads
window.onload = loadGoogleMapsScript;
