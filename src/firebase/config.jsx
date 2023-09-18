import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCnlwvJWxenY7lfndrKpG0Y15DU5booHA",
  authDomain: "vitrine-537b1.firebaseapp.com",
  projectId: "vitrine-537b1",
  storageBucket: "vitrine-537b1.appspot.com",
  messagingSenderId: "210969603436",
  appId: "1:210969603436:web:b43807abbedc8f25d31749",
  measurementId: "G-RFQ2RMTJE5"
};


  export default firebase.initializeApp(firebaseConfig)