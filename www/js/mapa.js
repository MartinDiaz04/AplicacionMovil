let map;
let latitudDispositivo = -34.836823;
let longitudDispositivo = -56.205770;

//función invocada desde Navegar() en main.js
function CargarMapaYMarcadores(){
    AgregarEstilosMapa("map");
    ObtenerCoordenadas();
    setTimeout(() => {
        if (map != null) {
            map.remove();
        }
        MostrarMapa(latitudDispositivo, longitudDispositivo, "map");
        CargarMarcadorUsuario();
    }, 1500);
}

//Agrega estilos al div contenedor
function AgregarEstilosMapa(idParrafo){
    const mapa = document.querySelector(`#${idParrafo}`);
    mapa.style.width = "100%";
    mapa.style.height = "75%";
    mapa.style.margin = "auto";
}


function ObtenerCoordenadas(){
    navigator.geolocation.getCurrentPosition(GuardarPosicionDispositivo, MostrarError);
}

function GuardarPosicionDispositivo(posicion) {
    latitudDispositivo = posicion.coords.latitude;
    longitudDispositivo = posicion.coords.longitude;
}

function MostrarError(error) {
    console.error(error.message);
    document.querySelector("#mapaMsj").innerHTML = "No se pudo obtener la ubicación del dispositivo";
}

function MostrarMapa(latitud, longitud, idParrfo, zoom=5){
    if(latitud==0 && longitud==0){
        ObtenerCoordenadas();
    }
    map = L.map(`${idParrfo}`).setView([latitud,longitud], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function CargarMarcadorUsuario(){
    if (map != null) {
        map.remove();
    }
    MostrarMapa(latitudDispositivo, longitudDispositivo, "map");
    const marker = L.marker([latitudDispositivo,longitudDispositivo]).addTo(map);
    marker.bindPopup(`<b>Usted está aquí</b>`).openPopup();
}
