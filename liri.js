// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
require('dotenv').config()

inquirer //--- Initial prompt (Main screen) ---//
    .prompt([
        {
            type: "list",
            message: "Select an option",
            choices: ["Bands in town", "Find a song", "Find a movie"],
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
                        axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
                            function (response) {

                                console.log("Lineup: " + response.data[0].lineup.toString());
                                console.log(response.data[0].venue.name);
                                console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
                                console.log(response.data[0].datetime);
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

                        spotify.search({ type: 'track', query: songs, limit: 2 }, function (err, data) {
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }
                            console.log(data.tracks.items[0].album.artists[0].name);
                            console.log(data.tracks.items[0].name);
                            console.log(data.tracks.items[0].album.name);
                            console.log(data.tracks.items[0].external_urls.spotify);
                        });
                    }

                })
        } //--- End of "Find a song" ---//

        if (inquirerResponse.list === "Find a movie") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Enter movie title",
                        name: "searchmovies"
                    }
                ])
                .then(function (inquirerResponse) {
                    var movie = inquirerResponse.searchmovies;

                    if (inquirerResponse.searchmovies === movie) {

                        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
                            function(response) {
                                console.log(response.data.Title);
                                console.log(response.data.Released);
                                console.log("Movie rating: " + response.data.imdbRating);
                                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                                console.log("\n" + response.data.Plot);
                              console.log("\n" + response.data.Actors);
                            }
                        );
                    }

                })
            }




            })

