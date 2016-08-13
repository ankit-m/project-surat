const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function getCurrentPosition() {
  if ('geolocation' in navigator) {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      }, (error) => {
        reject(error);
      }, options);
    });
    return promise;
  }
  return null;
}

export function watchCurrentPosition(callback) {
  if ('geolocation' in navigator) {
    const target = { latitude: 0, longitude: 0 };
    navigator.geolocation.watchPosition((position) => {
      if (target.latitude !== position.coords.latitude || target.longitude !== position.coords.longitude) {
        callback([position.coords.latitude, position.coords.longitude]);
      }
    }, (error) => {
      callback(null);
    }, options);
  }
  return null;
}
