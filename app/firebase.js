import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAgTzNb5TV-USYROLrcza2GU9IgzSZiePo',
  authDomain: 'project-surat.firebaseapp.com',
  databaseURL: 'https://project-surat.firebaseio.com',
  storageBucket: 'project-surat.appspot.com',
};

firebase.initializeApp(config);
const x = firebase;
export default x;
