var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
require('dotenv').config();

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
                                var findband = response.data;
                                fs.appendFileSync("log.txt", "\n### Bands in town info ###\n");
                                for (var i = 0; i < findband.length; i++) {
                                    console.log("\n" + "Lineup: " + findband[i].lineup.toString());
                                    fs.appendFileSync("log.txt", "\n" + "Lineup: " + findband[i].lineup.toString());

                                    console.log("Venue Name: " + findband[i].venue.name);
                                    fs.appendFileSync("log.txt", "\n" + "Venue Name: " + findband[i].venue.name);

                                    console.log("Venue Location: " + findband[i].venue.city + ", " + findband[i].venue.region + ", " + findband[i].venue.country);
                                    fs.appendFileSync("log.txt", "\n" + "Venue Location: " + findband[i].venue.city + ", " + findband[i].venue.region + ", " + findband[i].venue.country);

                                    console.log("Date: " + moment(findband[i].datetime).format('MMMM Do YYYY, h:mm a'));
                                    fs.appendFileSync("log.txt", "\n" + "Date: " + moment(findband[i].datetime).format('MMMM Do YYYY, h:mm a'));

                                }
                                fs.appendFileSync("log.txt", "\n" + "###### End of Bands in Town info ######\n");
                            });

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
                            var findtrack = data.tracks.items;
                            fs.appendFileSync("log.txt", "\n### Find a song info ###\n");

                            for (var i = 0; i < findtrack.length; i++) {
                                console.log("\n" + "Arists Name: " + findtrack[i].album.artists[0].name);
                                fs.appendFileSync("log.txt", "\n" + "Arists Name: " + findtrack[i].album.artists[0].name);

                                console.log("Track Name: " + findtrack[i].name);
                                fs.appendFileSync("log.txt", "\n" + "Track Name: " + findtrack[i].name);

                                console.log("Album Name: " + findtrack[i].album.name);
                                fs.appendFileSync("log.txt", "\n" + "Album Name: " + findtrack[i].album.name);

                                console.log("Link to song: " + findtrack[i].external_urls.spotify);
                                fs.appendFileSync("log.txt", "\n" + "Link to song: " + findtrack[i].external_urls.spotify);

                            }
                            fs.appendFileSync("log.txt", "\n" + "###### End of Find a song info ######\n");

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
                            function (response) {
                                fs.appendFileSync("log.txt", "\n### Find a movie info ###\n");

                                console.log("\n" + "Movie Name: " + response.data.Title);
                                fs.appendFileSync("log.txt", "\n" + "Movie Name: " + response.data.Title);

                                console.log("Release Date: " + response.data.Released);
                                fs.appendFileSync("log.txt", "\n" + "Release Date: " + response.data.Released);

                                console.log("Movie Rating: " + response.data.imdbRating);
                                fs.appendFileSync("log.txt", "\n" + "Movie Rating: " + response.data.imdbRating);

                                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                                fs.appendFileSync("log.txt", "\n" + response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);

                                console.log("\n" + "Plot: " + response.data.Plot);
                                fs.appendFileSync("log.txt", "\n" + "Plot: " + response.data.Plot);

                                console.log("\n" + "Actors: " + response.data.Actors);
                                fs.appendFileSync("log.txt", "\n" + "Actors: " + response.data.Actors);

                                fs.appendFileSync("log.txt", "\n" + "###### End of Find a movie info ######\n");

                            }
                        );
                    }

                })
        } //--- End of "Find a movie" ---//




    })

