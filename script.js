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
                    document.getElementById('polygonName').innerText = selectedPolygon;
                    document.getElementById('polygonMenu').style.display = 'block';
                    document.getElementById('menu').style.display = 'none';
                    document.getElementById('submenu').style.display = 'none';
                });
            }
        }).addTo(map);
    });

// Funciones para manejar la selección de escenario y rango de tiempo
function selectScenario(scenario) {
    selectedScenario = scenario;
    checkCombination();
}

function selectTimeRange(timeRange) {
    selectedTimeRange = timeRange;
    checkCombination();
}

// Función para verificar si se ha seleccionado una combinación completa
function checkCombination() {
    if (selectedScenario && selectedTimeRange) {
        // Mostrar el submenú con la combinación seleccionada
        document.getElementById('combination').innerText = 
            `Polígono: ${selectedPolygon}\nEscenario: ${selectedScenario}\nRango de Tiempo: ${selectedTimeRange}`;
        document.getElementById('submenu').style.display = 'block';
    }
}

// Funciones para manejar las opciones del menú del polígono
function showOption1() {
    alert(`Has seleccionado la Opción 1 para ${selectedPolygon}`);
}

function showOption2() {
    alert(`Has seleccionado la Opción 2 para ${selectedPolygon}`);
}

function showOption3() {
    alert(`Has seleccionado la Opción 3 para ${selectedPolygon}`);
}


// Función para redirigir a una nueva página
function redirectToPage(opcion) {
    const polygonName = encodeURIComponent(selectedPolygon); // Codificar el nombre del polígono para la URL
    if (opcion === 'escenariosSSP') {
        window.location.href = `escenarios-ssp.html?polygon=${polygonName}`;
    } else if (opcion === 'lineaBase') {
        window.location.href = `linea-base.html?polygon=${polygonName}`;
    } else if (opcion === 'otrasOpciones') {
        window.location.href = `otras-opciones.html?polygon=${polygonName}`;
    }
}
