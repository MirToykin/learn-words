import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBWAewVhXdipwaUUjck41LDoJ3W9DbYEQg",
  authDomain: "learn-words-59bcb.firebaseapp.com",
  databaseURL: "https://learn-words-59bcb.firebaseio.com",
  projectId: "learn-words-59bcb",
  storageBucket: "learn-words-59bcb.appspot.com",
  messagingSenderId: "38524699394",
  appId: "1:38524699394:web:67dba109440162e3d8b81b",
  measurementId: "G-MW45YS7GFQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;