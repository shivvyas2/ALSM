import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAV9t4mZV5as0l_HneIoKCA8Mpv8WuRI9Q",
    authDomain: "conspersa-ios-android.firebaseapp.com",
    projectId: "conspersa-ios-android",
    storageBucket: "conspersa-ios-android.appspot.com",
    messagingSenderId: "410643847743",
    appId: "1:410643847743:web:4e9db4e64e3f533d3a768a",
    measurementId: "G-2SK35NT6RR"
  };
  
// let app;

// if ( firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app(); // or else it will keep on initializing

// }


// const db = app.firestore();
// const auth = firebase.auth();

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage;


export{ db, auth };

