import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA0n6JAffVlFR62_CRrTUF49y89uKJ8m9k",
    authDomain: "jubup-8a313.firebaseapp.com",
    databaseURL: "https://jubup-8a313.firebaseio.com",
    projectId: "jubup-8a313",
    storageBucket: "jubup-8a313.appspot.com",
    messagingSenderId: "308430160414"
};

export const firebaseApp = firebase.initializeApp(config);
export const taskRef = firebaseApp.database().ref('tasks');
export const servicesRef = firebaseApp.database().ref('services');
