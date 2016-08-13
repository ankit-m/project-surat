import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAgTzNb5TV-USYROLrcza2GU9IgzSZiePo",
    authDomain: "project-surat.firebaseapp.com",
    databaseURL: "https://project-surat.firebaseio.com",
    storageBucket: "project-surat.appspot.com",
  };
firebase.initializeApp(config);

const database = firebase.database();

const initialState = {
  database,
};

export default function feature(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
