// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import "firebase/storage";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVELB0F2yzo8BkxcnoF1jdSZeuhQ9hmSA",
    authDomain: "bikeme-rt-scanner.firebaseapp.com",
    projectId: "bikeme-rt-scanner",
    storageBucket: "bikeme-rt-scanner.appspot.com",
    messagingSenderId: "794569312260",
    appId: "1:794569312260:web:685a23a67130b633634d51"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
let app;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}
// try {
//     app = getApp();
//   } catch (e) {
//     app = initializeApp(firebaseConfig);
//   }
// // const auth = getAuth(app);

export const auth = getAuth();

