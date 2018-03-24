const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')

    .command({
        command: 'featured',
        desc: 'Searches for featured playlists',
        handler: (argv) => {app.featuredPlaylists()}
    })

    .help('help')
    .argv
