//Code that wraps methods from our custom module
const request = require('request'); // "Request" library
const newRelease = require("../spotify-module")
const { table } = require('table')

let data = [],
  output


// Must be logged in browser before hand to work smoothly
const featuredPlaylists = (query) => {
  data.push(['Playlist', 'Link to Playlist (Hold cmd and click)'])
  newRelease.featuredPlaylists(query)
    .then(result => {
      result.playlists.items.forEach(function (element) {
        data.push([element.name, element.external_urls.spotify])
        output = table(data);
      });
      console.log(output);
    })
    .catch(err => console.log(err))
}

module.exports = {
  featuredPlaylists
}