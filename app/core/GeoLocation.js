function geo_success(position) {
  do_something(position.coords.latitude, position.coords.longitude);
}

function geo_error() {
  alert('Sorry, no position available.');
}

const geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
