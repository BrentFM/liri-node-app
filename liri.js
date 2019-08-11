// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
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
        //--- Sub menu ---//
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
                                
                                console.log("\n" + "Lineup: " + response.data[0].lineup.toString());
                                console.log("Venue Name: " + response.data[0].venue.name);
                                console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
                                console.log("\n" + "Date: " + moment(response.datetime).format('MMMM Do YYYY, h:mm:ss a'));
                            }
                        );
                    }

                })
        } //--- End of "Bands in town" ---//


//--- Sub menu ---//
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

                        spotify.search({ type: 'track', query: songs, limit: 5 }, function (err, data) {
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }
                            console.log("\n" + "Arists Name: " + data.tracks.items[0].album.artists[0].name);
                            console.log("Track Name: " + data.tracks.items[0].name);
                            console.log("Album Name: " + data.tracks.items[0].album.name);
                            console.log("\n" + "Link to song: " +data.tracks.items[0].external_urls.spotify);
                        });
                    }

                })
        } //--- End of "Find a song" ---//


//--- Sub menu ---//
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
                                console.log("\n" + "Movie Name: " + response.data.Title);
                                console.log("Release Date: " + response.data.Released);
                                console.log("Movie Rating: " + response.data.imdbRating);
                                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                                console.log("\n" + "Plot: " + response.data.Plot);
                              console.log("\n" + "Actors: " + response.data.Actors);
                            }
                        );
                    }

                })
            } //--- End of "Find a movie" ---//




            })

