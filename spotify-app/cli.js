/*Code that lets user interact with command line and get options, 
    --search, --help, --getMusic,.....
*/

//NOTE ADD A DEFAULT TO THIS THING WHEN DOING THE HANDLER!!!!!!!!!!!!!!! 


const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'searches for an item specified by the user',
        // Not sure what to put here yet; just setting it up
        builder: (yargs) => {
            return yargs.option('newRelease', {
                alias: 'newR',
                describe: 'List of newly released albums in a specific country',
                //default: 'true'
            }).option('artist', {
                alias:'art',
                describe: 'Searches for an artist'
            }).option('featured', {
                alias:'feat',
                describe: 'Searches for featured playlists'
            })
           
        },
        
        handler: (argv) => { 
            
            if(argv.newR){
                console.log("New releases being searched: ");
                app.new_release(argv.country = 'US', argv.limit = 5)
            }
            else if(argv.art){
                console.log("Artists being searched");
                app.search_artist(argv.artist)
            }
            else if(argv.feat){
                app.featuredPlaylists()
            }

        }
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
