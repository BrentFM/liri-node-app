// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
require('dotenv').config()

inquirer
    .prompt([
        {
            type: "list",
            message: "Select an option",
            choices: ["Bands in town", "Find a song", "Find movie"],
            name: "list"
        }
    ])
    .then(function (inquirerResponse) {

        if (inquirerResponse.list === "Bands in town") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Search for a band or artist",
                        name: "searchbands"
                    }
                ])
                .then(function (inquirerResponse) {
                    var band = inquirerResponse.searchbands;

                    if (inquirerResponse.searchbands === band) {
                        console.log(band)

                        axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
                            function (response) {
                                console.log(response.data);
                            }
                        );
                    }

                })
        } //--- End of "Bands in town" ---//



        if (inquirerResponse.list === "Find a song") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Search for a song",
                        name: "searchsong"
                    }
                ])
                .then(function (inquirerResponse) {
                    var songs = inquirerResponse.searchsong;
                    var Spotify = require("node-spotify-api");
                    var keys = require("./keys.js");
                    var spotify = new Spotify(keys.spotify);

                    if (inquirerResponse.searchsong === songs) {
                        console.log(songs)

                        spotify
                            .search({ type: 'track', query: songs })
                            .then(function (response) {
                                console.log(JSON.stringify(response.tracks.items.name, null, 2));
                            })
                            .catch(function (err) {
                                console.error('Error occurred: ' + err);
                            });
                    }

                })
        }

    })



// .then(function(inquirerResponse) {
//     if (inquirerResponse.list === "Bands in town") {
//         inquirer
//         .prompt([
//           {
//             type: "input",
//             message: "Search for a band",
//             name: "searchbands"
//           }
//       ])
//       if (inquirerResponse.list === "a band") {
//         console.log("it worked!")
//     }
//     }
//     else {
//         console.log("Error")
//     }
// })
