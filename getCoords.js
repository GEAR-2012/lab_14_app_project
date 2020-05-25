/*
variables
*/

const googleMapApiKey = `AIzaSyC-4bLBDeyCrDPZYRYyxOoxSG0elswC-Gs`;
const googleMapApiUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callabck=initMap`;
/*
Geolocation
*/

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(watchPos, showError);
} else {
  $("#geo").html("Geolocation is not supported by this browser.");
}

function watchPos(pos) {
  const coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  $("#geo").html(
    `
    <p>Your latitude: <span>${coord.lat}</span>°</p><br />
    <p>Your longitude: <span>${coord.lng}</span>°</p>
    `
  );

  initMap(coord);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}
/*
// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=" +
  googleMapApiKey +
  "&callback=initMap";
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
*/

// let getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.watchPosition(resolve, reject);
//   });
// };

// async function getData() {
//   const data = await getPosition();
//   const pos = { lat: data.coords.latitude, lng: data.coords.longitude };

//   $("#geo").html(`
//   <p>Latitude: <span>${pos.lat}</span> °</p><br />
//   <p>Longitude: <span>${pos.lng}</span> °</p>
//   `);
// }

// getData();

/*
GoogleMap
*/
let map;
function initMap(c) {
  if (c != undefined) {
    console.log(c);
    map = new google.maps.Map(document.querySelector("#map"), {
      center: c,
      zoom: 8,
    });
    marker = new google.maps.Marker({ position: c, map: map });
  }
}
