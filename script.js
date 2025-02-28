// Inicializar el mapa
var map = L.map('map').setView([0, 0], 2);

// Añadir una capa de tiles (por ejemplo, OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Cargar el GeoJSON
fetch('data/output.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function(feature, layer) {
                layer.on('click', function(e) {
                    // Mostrar el menú cuando se hace clic en un polígono
                    document.getElementById('menu').style.display = 'block';
                });
            }
        }).addTo(map);
    });

// Funciones para manejar la selección de escenario y rango de tiempo
function selectScenario(scenario) {
    alert('Escenario seleccionado: ' + scenario);
    // Aquí puedes añadir la lógica para manejar la selección del escenario
}

function selectTimeRange(timeRange) {
    alert('Rango de tiempo seleccionado: ' + timeRange);
    // Aquí puedes añadir la lógica para manejar la selección del rango de tiempo
}
