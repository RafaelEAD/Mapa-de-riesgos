// Inicializar el mapa
var map = L.map('map').setView([40.0, -3.0], 6);

// Añadir una capa de tiles (por ejemplo, OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Variables para almacenar la selección
var selectedPolygon = null;
var selectedScenario = null;
var selectedTimeRange = null;

// Cargar el GeoJSON
fetch('data/output.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function(feature, layer) {
                layer.on('click', function(e) {
                    selectedPolygon = feature.properties.NOMGEO; // O feature.properties.id
                    console.log("Polígono seleccionado:", selectedPolygon); // Depuración
                    document.getElementById('polygonName').innerText = selectedPolygon;
                    document.getElementById('polygonMenu').style.display = 'block';
                    document.getElementById('menu').style.display = 'none';
                    document.getElementById('submenu').style.display = 'none';
                });
            }
        }).addTo(map);
    });

// Función para redirigir a una nueva página
function redirectToPage(opcion) {
    const polygonName = encodeURIComponent(selectedPolygon); // Codificar el nombre del polígono para la URL
    console.log("Redirigiendo a:", opcion, "con polígono:", polygonName); // Depuración
    if (opcion === 'escenariosSSP') {
        window.location.href = `escenarios-ssp.html?polygon=${polygonName}`;
    } else if (opcion === 'lineaBase') {
        window.location.href = `linea-base.html?polygon=${polygonName}`;
    } else if (opcion === 'otrasOpciones') {
        window.location.href = `otras-opciones.html?polygon=${polygonName}`;
    }
}
