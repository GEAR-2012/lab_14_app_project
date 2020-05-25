/*
variables
*/

const googleMapApiKey = `AIzaSyC-4bLBDeyCrDPZYRYyxOoxSG0elswC-Gs`;
const googleMapApiUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callabck=initMap`;
/*
Geolocation
*/

let getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(resolve, reject);
  });
};

async function getData() {
  const data = await getPosition();
  const pos = { lat: data.coords.latitude, lng: data.coords.longitude };

  $("#geo").html(`
  <p>Latitude: <span>${pos.lat}</span> °</p><br />
  <p>Longitude: <span>${pos.lng}</span> °</p>
  `);
}

getData();

/*
GoogleMap
*/
