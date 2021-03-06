import * as firebase from 'firebase';
import { debounce } from './utils.js';

// account for webpack hotswaps
if( !firebase.apps.length ){
  const config = {
    apiKey: "AIzaSyCn6wVml3-naFor_7E8MHzUqqYQCwXruHw",
    authDomain: "asktrev-d4700.firebaseapp.com",
    databaseURL: "https://asktrev-d4700.firebaseio.com",
    storageBucket: ""
  };

  firebase.initializeApp(config);
}

const logPrefix = '[ DATABASE ]';
const db = firebase.database();
const auth = firebase.auth();

function transformData(callback, snapshot){
  callback(snapshot.val());
}

module.exports = {
  currUser: function(){
    return auth.currentUser;
  },
  logUserIn: function(email, pass){
    return auth.signInWithEmailAndPassword(email, pass);
  },
  logUserOut: function(){
    return auth.signOut().then(function(){
      console.log(logPrefix, 'Logged out');
    }, function(err){
      console.error(logPrefix, "Couldn't log out", err);
    });
  },

  /**
   * Listens for database updates, and dispatches the data when the updates occur.
   *
   * @param {function} callback - The function that'll be called every time the data changes.
   * @returns {function} - The `unsubscribe` method.
   * @example
   * const removeStateListener = authState(function(data){
   *   removeStateListener();
   *   // manipulate data here
   * });
   */
  authState: function(callback){
    return auth.onAuthStateChanged(function(data){
      debounce(callback.bind(null, data));
    });
  },

  db: db.ref(),

  dataFrom: function(key, callback, once=false){
    const ref = db.ref().child(key);

    if( once ){
      ref.once('value', transformData.bind(null, callback));
    }else{
      ref.on('value', transformData.bind(null, callback));
    }
  }
};