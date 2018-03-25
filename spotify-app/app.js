//Code that wraps methods from our custom module

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

let request = require('request'); // "Request" library
const { table } = require('table');
const inquirer = require('inquirer');
const colors = require('colors');
const newRelease = require("../spotify-module");
const countries = require("../spotify-module/config");

//For new-release output (Miguel)
let data = [['Number'.green, 'Album Name'.blue, 'Artists'.yellow, 'Released'.green, 'URL'.red]]
let artistName = []
let output;
let count = 1;
let albumList = []

//For song output (miguel)
let songData = [["Song Number", "Song Name", "Artists", "Song Length", "30sec Preview"]]
let songArtist = []
let out;
let countSong = 1;
let songList = []

//const Alyssa
const Table = require('cli-table');
let tables = new Table();

//Matthew
let dataP = [];

//table format (Miguel)
let conf
conf = {
  columns: {
      3: {
          width: 20,
          wrapWord: true
      }
  }
};


const draw = (s = true, n = 5) => {
  console.log("Something s: ", s);
  console.log("Something n: ", n);
}


const new_release = (country = 'US', limit = 5) => {

  //Ask for a 2 letter alpha country code 
  return inquirer.prompt([{
    type: 'input',
    message: 'Enter a 2 letter country code: ',
    name: 'alphaInput',
    //choices: countries.countries,// implement choices array - look at the inquirer documentation,
    validate: (answer) => {
      if (answer.length > 2 || answer.length <= 0) {
        return "Must be TWO letters and have NO numbers! "; //Maybe underline this 
      }
      else {
        ans = answer;
        return true;
      }
    }
  }])

    //Get the answer 
    .then(answers => {
      // wants to put input manually 
      //console.log("Answers passed in: ", answers);
      //console.log("The answers passed in is: ", answers.alphaInput);

      // Ask for how many results they want
      return inquirer.prompt([{
        type: 'input',
        message: 'Input how many recent albums you wish to view (1 - 50): ',
        name: 'numInput',

        validate: (answer) => {
          if (answer > 50 || answer <= 0 || isNaN(answer) == true/*|| isNaN(answer) === true*/) {
            return "Must be between a valid number between 1 to 50! "; //maybe uderline this
          }
          else {
            ans = answer;
            return true;
          }
        }
      }])
      
        //Now get the answer of the question
        .then(ans => {
         // console.log("You typed in for limit:  ", ans.numInput);

          //Fetch data using method exported from index.js
          newRelease.new_release(answers.alphaInput, ans.numInput)
            .then(result => {
              //console.log("The whole thing: ", result.albums.items);
              //console.log("The response: ", result.albums.items[2].artists[0].name);//Will go inside items inside artists and get individual names
              //console.log("The response: ", result.albums.items[0].name); // Will go through each one and print the album song  

              result.albums.items.forEach(element => {
                /*console.log("THE URL: ", element.external_urls.spotify, "");
                console.log("The album id: ", element.id);
                console.log(`Album Name:  ${element.name} `);
                console.log("Artists: ");*/

                element.artists.forEach(el => {
                  //console.log(`${el.name}`);
                  artistName.push(el.name)

                });
                //console.log(`Released on Spotify:  ${element.release_date}`);
                //console.log("the first element is ", element);
                console.log('\n');

                data.push([count, element.name, artistName.join(' , '), element.release_date, element.external_urls.spotify]); //count, album name, artists, releases, url
                albumList.push({ count: count, name: element.name, id: element.id });
                count++;
                artistName = [];

              })
              output = table(data);
              console.log(output);

            })

            .catch(err => console.log("Error: ", err))
            //From the list choose where to 
            .then(an => {
             // console.log("\nThis should be way after the table\n", albumList);
              return inquirer.prompt([{
                type: 'list',
                message: 'Choose one of the albums to see more information: ',
                name: 'albumInput',
                choices: albumList,
                validate: (answer) => {
                  if (answer > 1 || answer <= 0) {
                    return "Must be ONE choice! "; //maybe uderline this
                  }
                  else {
                    ans = answer;
                    return true;
                  }
                }
              }])

                //Based on what user picked we get id of artist 
                .then(a => {
                  //console.log("After the table you inputed: ", a);
                  let foundID = albumList.find(function (obj) { return obj.name === a.albumInput; });
                  //console.log("The found thing: ", foundID);
                  newRelease.searchAlbumTrack(foundID.id)
                    .then(res => {
                      //console.log("Album: ", a.albumInput);

                      //console.log("Songs: ", res.items[0].artists.name);
                      //console.log("Songs: ", res.items[0].name);
                      //console.log("Preview: ", res.items[0].preview_url);

                      res.items.forEach(element => {
                        //songArtist.push(element.name);
                        element.artists.forEach(el => {
                          songArtist.push(el.name);
                        });

                        //Get time in min:sec
                        let x = Math.floor(element.duration_ms / 1000)
                        let sec = Math.floor(x % 60)
                        Math.floor(x /= 60)
                        let min = Math.floor(x % 60)

                        songData.push([countSong, element.name, songArtist.join(", "), `${min}:${sec}`, element.external_urls.spotify])
                        countSong++;
                        songArtist = [];

                      });
                      out = table(songData)
                      console.log(out)
                      //Print song number, song name, artists, 30sec preview
                      //console.log("The artist in each song \n", songArtist);

                    })
                    .catch(err => console.log("Error: ", err))

                })
                .catch(err => console.log("Error: ", err))
            })
        })
        .catch(err => console.log("Error: ", err))
    })
    .catch(err => console.log(err))
}

//Alyssa (201-248)
const search_artist = (artist) => {
  let listOfArtists = []

  setTimeout(() => {

  newRelease.search_artist(artist)
  .then(result => {
    //console.log('The result!!!!!!!!!!!:', result)
    for (var i = 0; i < result.artists.items.length; i++) {
      listOfArtists.push({name: `${result.artists.items[i].name}`, popularity: `${result.artists.items[i].popularity}`, genre: `${result.artists.items[i].genres}`, followers: `${result.artists.items[i].followers.total}`})
      // listOfArtists.push({name: `${result.artists.items[i].name}`, genre: `${result.artists.items[i].genres}`, followers: `${result.artists.items[i].followers.total}`})
    }

    // console.log(listOfArtists)
    return inquirer.prompt([{
      type: 'checkbox',
      message: 'Select an Artist',
      name: 'music_artists',
      choices: listOfArtists,
      validate: (answer) => {
        if (answer.length > 1 || answer.length == 0) {
          return 'You can only choose one artist at a time.'
        }
        return true;
      }
    }])
  })
  .then(result => {
    listOfArtists.forEach((value, index) => {
      //console.log("You chose: ", result.music_artists);
      //console.log("Currently: ", value.name);
      if(value.name === (result.music_artists.toString())){
        // console.log(listOfArtists[index]);
        tables.push(
          { 'name': value.name },
          { 'popularity': value.popularity},
          { 'genre(s)' : value.genre},
          { 'followers' : value.followers}
        );
        console.log(tables.toString());
        
      }
    })
  })
  .catch(err => console.log(err))
}, 1000);
}

//matthew (251-263)
// Must be logged in browser before hand to work smoothly
const featuredPlaylists = (query) => {

  dataP.push(['Playlist', 'Link to Playlist (Hold cmd and click)'])
  setTimeout(() => {
    

  newRelease.featuredPlaylists(query)
    .then(result => {
      result.playlists.items.forEach(function (element) {
        dataP.push([element.name, element.external_urls.spotify])
        output = table(dataP);
      });
      console.log(output);
    })
    .catch(err => console.log(err))
  }, 1000);
}


module.exports = {
  search_artist,
  new_release,
  featuredPlaylists,
  draw,
  

}

//US 10
//places we dont know 
