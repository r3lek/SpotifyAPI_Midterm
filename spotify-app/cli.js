/*Code that lets user interact with command line and get options, 
    --search, --help, --getMusic,.....
    to run searchArtist:
    node cli.js search --artist artist you want to search for
*/


const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Searches for an item specified by the user',
        builder: (yargs) => {
            return yargs.option('artist', {
                // alias: '',
                describe: 'Searches for an artist'
            })
        },
        handler: (argv) => { app.search_artist(argv.artist)}
    })

    .command({
        command: 'newRelease',
        desc: 'Searches for new releases',
       
        builder: (yargs) => {
            return yargs.option('country', {
                alias: 'countrys',
                describe: 'A two letter char representation of a country that shall be searched'
            }).option('limit', {
                alias: 'limits',
                describe: 'Number of result'
            })
        },
        
        handler: (argv) => {app.new_release(argv.country, argv.limit)}
        
    })

    .help('help')
    .argv
