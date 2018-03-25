/*jshint esversion: 6 */
/*jshint asi: true */

const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('Usage: $0 <command> [options]')
    .command({
        command: 'search',
        desc: 'search from Spotify Web API [--artist, --album]',
        builder: (yargs) => {
            return yargs.option('artist', {
                describe: 'search for artist',
                type: 'string'
            }).option('album', {
                describe: 'search for album',
                type: 'string'
            })
        },
        handler: (argv) => {
            app.search(argv.album, argv.artist)
        }
    })
    .help('help')
    .argv