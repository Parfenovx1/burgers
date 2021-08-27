import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDIYs4ekPIwfhsNCzXCPh1W14e2KBG3gk4",
    authDomain: "very-tasty-burgers.firebaseapp.com",
    databaseURL: "https://very-tasty-burgers-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "very-tasty-burgers",
    storageBucket: "very-tasty-burgers.appspot.com",
    messagingSenderId: "835805545223",
    appId: "1:835805545223:web:76b24896ad56778d3abba2"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;