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

GoogleMap
*/
let map;
function initMap(c) {
  if (c != undefined) {
    console.log(c);
    map = new google.maps.Map(document.querySelector("#map"), {
      center: c,
      zoom: 15,
    });
    marker = new google.maps.Marker({ position: c, map: map });
  }
}
