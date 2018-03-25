/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

let request = require('request'); 
const superagent = require('superagent');
const client_id = 'a29b098605c44f6bbcc0a0520394c212';
const client_secret = '9a30d6786a72444c9dee908ad1809327'; 

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


request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    let token = body.access_token;
    console.log("The authorization token: " + token)
    console.log("")
    let options = {
      url: 'https://api.spotify.com/v1/users/clf3q2i5devozuns14hjh70ap',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

const _fetch = (command) => {
  return superagent.get(`${config.url}/${command}`)
      .set({
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        ,
        json: true
      })
      .then(response => response.body)
      .catch(error => error.response.body)
}



setTimeout(() =>{
  console.log('Test');
  exports.saveTrackUsr = () =>{
    return _fetch(`https://api.spotify.com/v1/me/tracks`);
  }
  exports.token;

}, 2000)
