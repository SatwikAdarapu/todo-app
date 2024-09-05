import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Firestore
import { getStorage } from 'firebase/storage'; // Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAn7_jBdkXGBN7aahcbJuVdR3glSQpTyBQ",
  authDomain: "todoapp-ff8e6.firebaseapp.com",
  projectId: "todoapp-ff8e6",
  storageBucket: "todoapp-ff8e6.appspot.com",
  messagingSenderId: "800197972138",
  appId: "1:800197972138:web:7b8bbc7d9d3488ac0800d3",
  measurementId: "G-0CMRRF2ZXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = getFirestore(app);
const projectauth = getAuth(app);
const projectStorage = getStorage(app); // Modular approach for Storage

export { projectFirestore, projectauth, projectStorage };
