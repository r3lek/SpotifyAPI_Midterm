//Custom module, that fetches data from the Spotify API, via http/request/superagent

const client_id = 'a29b098605c44f6bbcc0a0520394c212'; // Your client id
const client_secret = '9a30d6786a72444c9dee908ad1809327'; // Your secret
let request = require('request'); // "Request" library
const
     config = require('./config'),
     superagent = require('superagent')
let authToken ="";
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
      console.log("The auth token: ", token);//print out token 
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
        //console.log("BODY ITEMS:" , body.artists.items);
      });
    }
  });
  

const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .set({
            'Authorization': 'Bearer ' + "BQDzXxtIcSP5ttyBCk3ydfHxFxJuXxcCIUhQ4Ew3eV5JuS-NL-Rq0wFWxYYql5Kquciw0VxlsZ7p9YBrszK_lbRKtTouMqPvC0X5rFWU2aGUULJMO9TxWiS-_zObb4w-tzzw1QIcrFrzsWl9rtT1gXocwKNuS8hlUyYuVHY",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          ,
          json: true
        })
        .then(response => response.body)
       // console.log("the res", response.body)
        .catch(error => error.response.body)
        console.log("the error", error.response.body)
        
}

exports.new_release = () =>{
    console.log("The auth ttttt", authToken);
    return _fetch(`v1/browse/new-releases?country=US&offset=0&limit=5`);
       
}

exports.authToken = authToken;




/*
exports.deck = (shuffle) => {
    if (shuffle)
        return _fetch('deck/new/shuffle/?deck_count=1')
    else
        return _fetch('deck/new/')
}

exports.draw = (deck, n) => {
    return _fetch(`/deck/${deck}/draw/?count=${n}`)
}

exports.shuffle = (deck, n) => {
    return _fetch(`deck/${deck}/shuffle/`)
}

*/