import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBD4YzO8JMrZ7zume0Glspp9FEROXptMwg',

    authDomain: 'indie-game-finder.firebaseapp.com',

    projectId: 'indie-game-finder',

    storageBucket: 'indie-game-finder.appspot.com',

    messagingSenderId: '476456428515',

    appId: '1:476456428515:web:fc391abbadabf3971036d6',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase; 