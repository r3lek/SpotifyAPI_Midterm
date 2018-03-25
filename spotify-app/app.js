
let request = require('request');
const saveTrack = require("../spotify-module");


const saveTrackUsr = () => {
 
  saveTrack.saveTrackUsr()  
  .then(result => {

      console.log("Result", result) 
  })
  .catch(err => console.log(err))

}

module.exports = {
  saveTrackUsr
}