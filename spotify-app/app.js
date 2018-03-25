/*jshint esversion: 6 */
/*jshint asi: true */

const
    spotify = require('spotify-module'),
    inquirer = require('inquirer'),
    {
        table
    } = require('table'),
    colors = require('colors'),
    cliui = require('cliui'),
    moment = require('moment')

const displayAlbumDetails = (albumResult) => {

    const
        ui = cliui(),
        footer = cliui(),
        albumName = albumResult.name,
        artistName = albumResult.artists[0].name,
        copyright = albumResult.copyrights[0].text,
        year = new Date(albumResult.release_date).getFullYear(),
        albumDuration = albumResult.tracks.items.reduce((total, current) => {
            return {
                duration_ms: total.duration_ms + current.duration_ms
            }
        })

    ui.div({
        text: `${albumName.bold}\nby ${artistName}`,
        padding: [1, 0, 0, 0],
        width: 30,
        border: true
    })

    ui.div({
        text: `${year} | ${albumResult.tracks.items.length} songs | ${moment(albumDuration.duration_ms).format('mm')} min`,
        border: true,
        width: 30
    })

    console.log(ui.toString())

    const
        headers = ['#'.bold, 'TITLE'.bold, 'TIME'.bold],
        tracks = albumResult.tracks.items.map((track) => {

            const {
                track_number,
                name,
                duration_ms
            } = track

            return [track_number, name, moment(duration_ms).format('mm:ss')]

        })

    //Add headers to beginning of array
    tracks.unshift(headers)

    console.log(table(tracks))

    footer.div({
        text: copyright,
        width: 75,
        padding: [0, 0, 1, 0]
    })
    console.log(footer.toString())

}

//Inquirer prompt
const enablePrompt = (result) => {

    const {
        total,
        items,
        limit,
        offset
    } = result

    searchResults = items.map((item) => {
        const {
            name,
            release_date,
            id
        } = item
        const artistName = item.artists[0].name
        const year = new Date(release_date).getFullYear()
        return {
            name: `${name} - ${artistName} (${year})`,
            value: id
        }
    })

    return inquirer.prompt([{
            type: 'list',
            message: 'Search Results:',
            name: 'selectedAlbum',
            choices: searchResults
        }])
        .then(answer => spotify.fetch_album(answer.selectedAlbum))
        .then(albumResult => displayAlbumDetails(albumResult))

}

//Search Spotify Web API
const search = (albumQuery = '', artistQuery = '') => {

    //Search album
    if (albumQuery != '') {
        spotify.search_album(albumQuery)
            .then(response => enablePrompt(response.albums))
            .catch(err => console.log(err))
    }

}

module.exports = {
    search
}