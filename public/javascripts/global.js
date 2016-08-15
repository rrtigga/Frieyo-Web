window.newActiveItems = [];


/*Firebase below --------*/

var userID = localStorage.getItem('userID');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqvvBsoSFzU4NddtvYqKD8bSX5i68Vvpg",
  authDomain: "project-1806909540976051541.firebaseapp.com",
  databaseURL: "https://project-1806909540976051541.firebaseio.com",
  storageBucket: "project-1806909540976051541.appspot.com",
};
firebase.initializeApp(config);


function writeUserActivities(userID) {
  firebase.database().ref('users/' + userID).child('activities').set(window.newActiveItems);
}

function doneActivities() {
  console.log(window.newActiveItems);
   writeUserActivities(userID);

   if(window.newActiveItems.length >= 3){
      //redirect to contact.ejs
      window.location = "contact";
   }


}




/*Firebase Ends */