import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAetAuo0ep-VuezE2PIFNEQzT0f9LMyUtk",
    authDomain: "evemaker-706e6.firebaseapp.com",
    projectId: "evemaker-706e6",
    storageBucket: "evemaker-706e6.appspot.com",
    messagingSenderId: "103522513382",
    appId: "1:103522513382:web:2530753ca759302f41a627",
    measurementId: "G-J72Z82WKTS"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const storage = getStorage(app);


export { app, fireDB, storage };