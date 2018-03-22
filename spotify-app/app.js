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


const new_release = (country = 'US', limit = 5) => {





  newRelease.new_release(country,limit)  
  .then(result => {

    console.log("The whole thing: ", result.albums.items);
    //console.log("The response: ", result.albums.items[2].artists[0].name);//Will go inside items inside artists and get individual names
    //console.log("The response: ", result.albums.items[0].name); // Will go through each one and print the album song  
    result.albums.items.forEach(element => {
      console.log(`Album Name:  ${element.name} `);  
      console.log("Artists: ");
      element.artists.forEach(el  => {
          console.log(`${el.name}`);
      });
      console.log(`Released on Spotify:  ${element.release_date}`);
      //console.log("the first element is ", element);
      console.log('\n');
      })
  })
  .catch(err => console.log(err))

}








// Another test case:
// https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10

module.exports = {
  new_release

}