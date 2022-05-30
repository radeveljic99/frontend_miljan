
// import firebase from "firebase";
// import "firebase/storage";;
//
// const firebaseConfig = {
//     apiKey: "AIzaSyC9jSuPN8I1_T7UsVEqB1ZcvrR4wV_u8N4",
//     authDomain: "zemlja-snova.firebaseapp.com",
//     projectId: "zemlja-snova",
//     storageBucket: "zemlja-snova.appspot.com",
//     messagingSenderId: "1004558431425",
//     appId: "1:1004558431425:web:daf21f77de5d75d8d1d040",
//     measurementId: "G-E10PR8L5KK"
// }
//
// firebase.initializeApp(firebaseConfig);
// var storage = firebase.storage();
// export default storage;

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC9jSuPN8I1_T7UsVEqB1ZcvrR4wV_u8N4",
    authDomain: "zemlja-snova.firebaseapp.com",
    projectId: "zemlja-snova",
    storageBucket: "zemlja-snova.appspot.com",
    messagingSenderId: "1004558431425",
    appId: "1:1004558431425:web:daf21f77de5d75d8d1d040",
    measurementId: "G-E10PR8L5KK"
}

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
