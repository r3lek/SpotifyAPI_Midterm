//Custom module, that fetches data from the Spotify API, via http/request/superagent
const
     config = require('./config'),
     superagent = require('superagent')


const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.new_release = (country,limit) =>{
    return _fetch(`/v1/browse/new-releases?country=${country}&offset=0&limit=${limit}`); 
       
}





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