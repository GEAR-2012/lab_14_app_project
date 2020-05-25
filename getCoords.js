/*

*/
/*
Geolocation
*/

const googleMapApiKey = "AIzaSyC-4bLBDeyCrDPZYRYyxOoxSG0elswC-Gs";
const googleMapApiUrl =
  "https://maps.googleapis.com/maps/api/js" +
  "?key=" +
  googleMapApiKey +
  "&callabck=" +
  "initMap";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, displayError);
  // watchId = navigator.geolocation.watchPosition(scrollMap, displayError);
} else {
  $("#geo").text("The geolocation API is not available in your browser.");
}

let userLat;
let userLng;
let userSpeed;
let userPos;
let map;

function showPosition(position) {
  userLat = position.coords.latitude.toFixed(6);
  userLng = position.coords.longitude.toFixed(6);
  userLat = parseFloat(userLat, 10);
  userLng = parseFloat(userLng, 10);
  if (position.coords.speed != null) {
    userSpeed = position.coords.speed.toFixed(6);
  } else {
    userSpeed = position.coords.speed;
  }
  $("#geo").html(`
    <h3>Latitude -</h3>
    <h3 class='highlighted'>${userLat}</h3>
    <h3>Longitude -</h3>
    <h3 class='highlighted'>${userLng}</h3>
    <h3>Speed -</h3>
    <h3 class='highlighted'>${userSpeed}</h3>
  `);
  /*

*/

  // Create the script tag, set the appropriate attributes
  var script = document.createElement("script");
  script.src = googleMapApiUrl;
  script.defer = true;
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    // The location of the User
    userPos = { lat: userLat, lng: userLng };
    // var userPos = { lat: 57.23712, lng: -2.44009 };// our house

    // The map, centered at the location of the User
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: userPos,
    });
    // // The marker, positioned at the location of the User
    // var marker = new google.maps.Marker({
    //   position: userPos,
    //   title: "user",
    //   map: map,
    // });
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}

navigator.geolocation.watchPosition(getCoords);

function getCoords(position) {
  let a = position.coords.latitude;
  let b = position.coords.longitude;
  console.log(a, b);
  addMarker(a, b);
}

function addMarker(latitude, longitude) {
  let pos = { lat: latitude, lng: longitude };
  var marker = new google.maps.Marker({
    position: pos,
    title: "user",
    map: map,
  });
}

function displayError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      $("#geo").html(`
     <h3 class='highlighted'>
       Permission denied for Geolocation request by user.
     </h3>
     `);
      break;
    case error.POSITION_UNAVAILABLE:
      $("#geo").html(`
     <h3 class='highlighted'>
       Geolocation information unavailable.
     </h3>
     `);
      break;
    case error.TIMEOUT:
      $("#geo").html(`
     <h3 class='highlighted'>
       Geolocation request timed out
     </h3>
     `);
      break;
    case error.UNKNOWN_ERROR:
      $("#geo").html(`
     <h3 class='highlighted'>
       An unknown error has occurred.
     </h3>
     `);
      break;
  }
}
