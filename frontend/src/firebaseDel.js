// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFmd0yxd6GgdAyX9l2Vv8IfAef0MuZYCM",
  authDomain: "profile-photos.firebaseapp.com",
  projectId: "profile-photos",
  storageBucket: "profile-photos.appspot.com",
  messagingSenderId: "371378139943",
  appId: "1:371378139943:web:86ac715a2aa0c7534caf02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
