//Custom module, that fetches data from the Spotify API, via http/request/superagent

const client_id = 'a29b098605c44f6bbcc0a0520394c212'; // Your client id
const client_secret = '9a30d6786a72444c9dee908ad1809327'; // Your secret
let request = require('request'); // "Request" library
const
     config = require('./config'),
     superagent = require('superagent')
let authToken ="";
let op;




/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */


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
      //console.log(body);
    });
  }
});

const _fetch = (command) => {
  return superagent.get(`${config.url}/${command}`)
      .set({
          'Authorization': 'Bearer ' + authToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        ,
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

//CAN UNCOMMENT THE BOTTOM, wont affect anything somehow  
//   exports.new_release = (country, limit) =>{
//     //console.log("The auth ", authToken);
//     //console.log("The country ", country, "\n");
//     return _fetch(`v1/browse/new-releases?country=${country}&offset=0&limit=${limit}`);//CHANGE THIS!!!!!!!   
// }

// exports.searchAlbumTrack = (id) =>{
//   console.log("Will now display tracks from album selected: ");
//   return _fetch(`v1/albums/${id}/tracks`);
// }

// exports.token;

// exports.authToken = authToken;

}, 3000)


//Miguel
exports.new_release = (country, limit) =>{
  //console.log("The auth ", authToken);
  //console.log("The country ", country, "\n");
  return _fetch(`v1/browse/new-releases?country=${country}&offset=0&limit=${limit}`);//CHANGE THIS!!!!!!!   
}

//Miguel
exports.searchAlbumTrack = (id) =>{
  console.log("Will now display tracks from album selected: ");
  return _fetch(`v1/albums/${id}/tracks`);

}

//Alyssa 
exports.search_artist = (artist) => {
  // console.log("Authorization Token: ", authToken);
  // console.log("Artist Name: ", name);
  console.log("Cant see auth?: ", authToken);
  return _fetch(`v1/search?q=${artist}&type=artist&market=US&limit=5`);
}

//Matthew
exports.featuredPlaylists = () => {
  return _fetch('v1/browse/featured-playlists')
}



//MY OWN!!!!!! 
// const _fetch = (command) => {
//     return superagent.get(`${config.url}/${command}`)
//         .set({
//             'Authorization': 'Bearer ' + "BQDOvo7NuvKdAaft8qI7DSTznUWU0GufC5Z6db6xc5tyKJS089SzCzGYo47RWK1MPuBRtAqwzHNxw5Tlw83muDWotqVRtrGOL5XUUIZ1fodP8T8fhCMWqAXudLOjqw4yws2rf-Xg4vitmDKPIfUp7Dhp-hyHT7On3oLYlEc",
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           ,
//           json: true
//         })
//         .then(response => response.body)
//         console.log("the res", response.body)
//         .catch(error => error.response)
//         //console.log("the error", error)
//         //console.log("The command ", command);
        
// }

// exports.new_release = (country, limit) =>{
//     //console.log("The auth ", authToken);
//     //console.log("The country ", country, "\n");
//     return _fetch(`v1/browse/new-releases?country=${country}&offset=0&limit=${limit}`);//CHANGE THIS!!!!!!!   
// }

// exports.searchAlbumTrack = (id) =>{
//   console.log("Will now display tracks from album selected: ");
//   return _fetch(`v1/albums/${id}/tracks`);

// }

//^^END OF MY OWN

// exports.authToken = authToken;