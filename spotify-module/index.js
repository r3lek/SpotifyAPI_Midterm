/*jshint esversion: 6 */
/*jshint asi: true */

const
    config = require('./config'),
    superagent = require('superagent'),
    //Spotify account
    client_id = 'a29b098605c44f6bbcc0a0520394c212',
    client_secret = '9a30d6786a72444c9dee908ad1809327',
    authToken = 'BQB9YDKdADyeh5yeSHRa2aDrOn2MYu-9Om-wvxKTEHE53LnvXgOiwk7SMYAv09fCQGe_nahZ60XUSg0FmMbP80GeCoXwtBbiqkXj2mnY8lIPDnLdc2f90AN9jgrWVMiDkrV0SzhA288ue0o9daZqNlqBGpv4S9eLEjxgrSk'

const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}`)
        .set({
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .then(response => response.body)
        .catch(error => error.response.body)
}

const _search = (query, type) => {

    const command = `v1/search?q=${query}&type=${type}`
    return _fetch(command)

}

exports.search_album = (query) => {
    return _search(query, 'album')
}

exports.fetch_album = (id) => {
    return _fetch(`v1/albums/${id}`)
}