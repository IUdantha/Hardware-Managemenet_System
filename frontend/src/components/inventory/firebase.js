import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAgRmkPnAviDW6gozLCDGMJsyw9XwGLAyw",
    authDomain: "itp-project-9c1ec.firebaseapp.com",
    projectId: "itp-project-9c1ec",
    storageBucket: "itp-project-9c1ec.appspot.com",
    messagingSenderId: "75485430376",
    appId: "1:75485430376:web:6d3180723280db17f431dd",
    measurementId: "G-ZL1SMPMJN7"
  };
  
  firebase.initializeApp(firebaseConfig);
  export const dataref = firebase.database();
  export const storage = firebase.storage();


  export default firebase;