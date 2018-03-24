//Custom module, that fetches data from the Spotify API, via http/request/superagent

const client_id = 'a29b098605c44f6bbcc0a0520394c212'; 
const client_secret = '9a30d6786a72444c9dee908ad1809327'; 
const request = require('request'); // "Request" library
const superagent = require('superagent')

const config = require('./config')
let authToken = "";
let op;

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
      authToken=token;

      let options = {
        url: `https://api.spotify.com/v1/browse/new-releases?country=US&offset=0&limit=5`,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        json: true
      };

      op = options;

      request.get(options, function(error, response, body) {
        //console.log(body);
        //console.log("BODY ITEMS:" , body.albums.items);
      });
      
    }
  });
  

const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .set({
            'Authorization': 'Bearer ' + "BQA5cCVIgh1mOTT-9AUUmylJQHgIY0TomkLp-Zlmr2pW72TJhsn4lfHVf77A04SaEEOXTc0obe8AfJJH9PIVTgQx2HkYGK9hURDqlJwV8SG6PuLFQTymb3np89Yu1lCWT-zouwaAHHxzc3Nm",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          ,
          json: true
        })
        .then(response => response.body)
            console.log("the res", response.body)

        .catch(error => error.response.body)
            console.log("the error", error.response)
}

exports.featuredPlaylists = () => {
  return _fetch('v1/browse/featured-playlists')
}

exports.authToken = authToken;