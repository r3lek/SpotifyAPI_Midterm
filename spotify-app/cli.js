/*Code that lets user interact with command line and get options, 
    --search, --help, --getMusic,.....
*/

const 
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'searches for an item specified by the user',
        // Not sure what to put here yet; just setting it up
        builder: (yargs) => {
            return yargs.option()
        },
        handler: (argv) => {}
    })
    .help('help')
    .argv
