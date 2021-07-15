import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBeMHG9WPaqL0wtHS8WHlVWJq_j6MTVNwQ",
  authDomain: "sparks-bank-1edc9.firebaseapp.com",
  projectId: "sparks-bank-1edc9",
  storageBucket: "sparks-bank-1edc9.appspot.com",
  messagingSenderId: "1007264507387",
  appId: "1:1007264507387:web:7680da8fe99c882afb975e",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase;
