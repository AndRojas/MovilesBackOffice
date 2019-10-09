import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase';

const config = {
    
    apiKey: "AIzaSyBxa5VVIvhM7opgLN-etTJdJVPyFeMqaCM",
    authDomain: "restaurantdb-a06b0.firebaseapp.com",
    databaseURL: "https://restaurantdb-a06b0.firebaseio.com",
    projectId: "restaurantdb-a06b0",
    storageBucket: "restaurantdb-a06b0.appspot.com",
    messagingSenderId: "507921655190"
    
  };
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
