let mymap;
let mymarker;

getMap();

function displayPos(posObj) {
  const contOut = document.querySelector("#output");
  let html = `
               <p>Your latitude: <span>${posObj.lat.toFixed(5)}</span> °</p>
               <br />
               <p>Your longitude: <span>${posObj.lng.toFixed(5)}</span> °</p>
 `;
  contOut.innerHTML = html;
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(updatePosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function updatePosition(position) {
  let pos = { lat: position.coords.latitude, lng: position.coords.longitude };
  console.log(pos.lat, pos.lng);
  updateMapMarker(pos);
  displayPos(pos);
}

function getMap(obj) {
  mymap = L.map("map").setView([0, 0], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZ2Vhci0yMDEyIiwiYSI6ImNrYW1yeTZsNzBuMjYyeXFtZmd6ZHUzNHoifQ.qcZ6YVAn-IVRQMjnrOAX9w",
    }
  ).addTo(mymap);

  mymarker = L.marker([0, 0]).addTo(mymap);
}

function updateMapMarker(posObj) {
  //set the center of the map
  mymap.setView([posObj.lat, posObj.lng]);
  //set the marker on the map
  mymarker.setLatLng([posObj.lat, posObj.lng]);
}
