import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';// Firestore


const firebaseConfig = {
    apiKey: "AIzaSyAn7_jBdkXGBN7aahcbJuVdR3glSQpTyBQ",
    authDomain: "todoapp-ff8e6.firebaseapp.com",
    projectId: "todoapp-ff8e6",
    storageBucket: "todoapp-ff8e6.appspot.com",
    messagingSenderId: "800197972138",
    appId: "1:800197972138:web:7b8bbc7d9d3488ac0800d3",
    measurementId: "G-0CMRRF2ZXP"
  };
  //init firebase
  firebase.initializeApp(firebaseConfig)
  //init services
  const projectfirestore = firebase.firestore()
  const projectauth = firebase.auth()
  //timestamp
  const timestamp = firebase.firestore.timestamp
  export {projectfirestore, projectauth, timestamp}

