//Code that wraps methods from our custom module


//Set up a server to make sure node is running properly
// const http = require("http");
// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }).listen(8888);
// console.log("Running server http://localhost:8888/");


/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

let request = require('request'); // "Request" library
const newRelease = require("../spotify-module");

const client_id = 'a29b098605c44f6bbcc0a0520394c212'; // Your client id
const client_secret = '9a30d6786a72444c9dee908ad1809327'; // Your secret



const new_release = (country ='US', limit = 5) => {
  console.log("Testing the new release.");
  
}






// your application requests authorization
let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


/*
  Depending on what we choose for options we may have to change this bottom fnc
  If we are going to add user option to add/remove/view user info then we'll have to use: 
  https://github.com/spotify/web-api-auth-examples/tree/master/authorization_code
*/


request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    let token = body.access_token;
    console.log("Thr auth token: ", token);//print out token 
    let options = {
      url: 'https://api.spotify.com/v1/search?query=taylor&type=artist&offset=0&limit=5',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
      console.log("BODY ITEMS:" , body.artists.items);
    });
  }
});



// Another test case:
// https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10

module.exports = {
  new_release,

}