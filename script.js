// Initialize the map
var map = L.map('map').setView([-2.5489, 118.0149], 5); // Center of Indonesia

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to load province data by ID
function loadProvince() {
    var provinceId = document.getElementById('provinceId').value;

    if (!provinceId) {
        alert("Please enter a province ID");
        return;
    }

    // Construct the API URL
    var apiUrl = `https://zulham.ahlitani.com/geo/v1/prov/${provinceId}/map`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Clear any existing layers
            // map.eachLayer(function (layer) {
            //     if (layer !== map.tileLayer) {
            //         map.removeLayer(layer);
            //     }
            // });

            
            
            // console.log(data.provFeature);

            // Add GeoJSON layer to the map
            L.geoJSON(data.provFeature).addTo(map);

            // Fit the map to the GeoJSON layer
            map.fitBounds(L.geoJSON(data.provFeature).getBounds());
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to load province data');
        });


}
