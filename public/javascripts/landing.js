//firebase below --------


var userID;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqvvBsoSFzU4NddtvYqKD8bSX5i68Vvpg",
  authDomain: "project-1806909540976051541.firebaseapp.com",
  databaseURL: "https://project-1806909540976051541.firebaseio.com",
  storageBucket: "project-1806909540976051541.appspot.com",
};
firebase.initializeApp(config);

function writeUserData(userObject) {
  firebase.database().ref('users/' + userID).set(userObject);
  console.log(userObject + " saved in database");
}
//writeUserData("savage","savage","savage");

function writeNewPost(uid, username, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

//------facebook below


// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
/*function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}*/
window.fbAsyncInit = function() {
  FB.init({
    appId      : '239721243075049',
    xfbml      : true,
    version    : 'v2.6'
  });
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
/*function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
  FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  });
}*/

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}


function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            console.log(response); // dump complete info
            var accessToken =   FB.getAuthResponse()['accessToken'];
            console.log('Access Token = '+ accessToken);
            userID = FB.getAuthResponse()['userID']; //get FB UID
            console.log("userID: "+ userID);
            //refer to getData() function below
            getData(accessToken);
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {'scope': 'public_profile,email,user_friends,user_likes,user_location'});
}


function getData(accessToken) {
  var userData;
  FB.api('/me', 'get', { access_token: accessToken, fields: 'id,name,gender,email,location,friends,likes,picture' }, function(response) {
    //here's the full object with all the data
    //console.log(response.accessToken);
    userData = response;
    console.log(userData);
    userData["accessToken"]=accessToken;
    FB.api("/me/picture?width=1000&height=1000",  function(response) {
      userData.picture.data.url = response.data.url;
      writeUserData(userData);
    });
    
  });

  //check if the loginStatus works
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
     
      //redirect to start/location.ejs
      //window.location = "start/location";

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
    }
  });
}

function navCollapse() {
  document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}

