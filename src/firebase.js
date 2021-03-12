import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "-----removed-----",
  authDomain: "lavender-lizard.firebaseapp.com",
  databaseURL: "https://lavender-lizard.firebaseio.com",
  projectId: "lavender-lizard",
  storageBucket: "lavender-lizard.appspot.com",
  messagingSenderId: "803736001505",
  appId: "1:803736001505:web:049d5e72ed85c9b27410a0",
  measurementId: "G-NRPWM9DS7F"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseData = firebaseDB.ref();

export {
  firebase,
  firebaseDB,
  firebaseData,
}
