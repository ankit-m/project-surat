export function getCurrentPosition() {
  if ('geolocation' in navigator) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, (error) => {
        reject(error);
      }, options);
    });
    return promise;
  }
  return null;
}

export function watchCurrentPosition() {
  // sad
}
