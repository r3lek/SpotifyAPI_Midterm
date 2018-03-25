//Custom module, that fetches data from the Spotify API, via http/request/superagent
const client_id = 'a29b098605c44f6bbcc0a0520394c212'; // Your client id
const client_secret = '9a30d6786a72444c9dee908ad1809327'; // Your secret
let request = require('request'); // "Request" library
const
     config = require('./config'),
     superagent = require('superagent')
let authToken ="";
let op;


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
    authToken = token;
    //console.log("The authorization token: " + token) //Can unccoment this for demo
    //console.log("")
    let options = {
      url: 'https://api.spotify.com/v1/users/clf3q2i5devozuns14hjh70ap',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      //console.log(body);
    });
  }
});

const _fetch = (command) => {
  return superagent.get(`${config.url}/${command}`)
      .set({
          'Authorization': 'Bearer ' + authToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        json: true
      })
      .then(response => response.body)
      .catch(error => error.response.body)
}

setTimeout(() =>{
 // console.log('Test');
  exports.saveTrackUsr = () =>{
    return _fetch(`v1/me/tracks`);
  }
}, 3000)


//Miguel
exports.new_release = (country, limit) =>{
  console.log("Will display newly released albums based on country");
  return _fetch(`v1/browse/new-releases?country=${country}&offset=0&limit=${limit}`);//CHANGE THIS!!!!!!!   
}

//Miguel
exports.searchAlbumTrack = (id) =>{
  console.log("Will now display tracks from album selected: ");
  return _fetch(`v1/albums/${id}/tracks`);
}

//Alyssa 
exports.search_artist = (artist) => {
  console.log("Will display artist based on name: ");
  return _fetch(`v1/search?q=${artist}&type=artist&market=US&limit=5`);
}

//Matthew
exports.featuredPlaylists = () => {
  console.log("Will now display featured playlists: ");
  return _fetch('v1/browse/featured-playlists')
}

