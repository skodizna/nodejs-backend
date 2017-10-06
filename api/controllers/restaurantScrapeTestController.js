'use strict';
var request = require('request');
var cheerio = require('cheerio');
var Items = require('../models/restaurantListModel'); //created model loading here
var mongoose = require('mongoose'),
    Restaurant = mongoose.model('Items');

var test = true;

exports.scrape_restaurants = function(req, res) {
    var restaurants = new Object();
    restaurants.item = [];

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    // Hamburg
    var url = 'http://www.restauracehamburg.cz/';
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        var restaurant = new Object();
        restaurant.name = "Restaurant Hamburg";
        restaurant.web = "http://www.restauracehamburg.cz/";
        restaurant.menu = [];

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var titleObject;

            $('.content.bigger table:nth-child(2)').filter(function(){
                var data = $(this);


                titleObject = data.find("tr");
                console.log(titleObject);
                for (var i = 0; i <= titleObject.length; i++ ) {
                    var food = new Object();
                    var row = $(titleObject[i]);

                    //console.log($(titleObject[i]).text());
                    if (row.find("td:nth-child(2)").text() != '') {
                        food.name = row.find("td:nth-child(2)").text();
                        food.price = row.find("td:nth-child(3)").text();
                        //food.push({title : $(titleObject[i]).text(), price : $(priceObject[i]).text()});
                        restaurant.menu.push(food);
                    }

                };

                //console.log(titleObject.length);
                //console.log(JSON.stringify(restaurant));
                //console.log(restaurant);
            });




        } else {
            restaurant.menu = false;
            console.log(error);
        }

        // ulozeni do DB
        //saveItem(restaurant);
        console.log(restaurant);

    })

    setTimeout(function(){
        if (test) {
            res.send('ok');
        }
    }, 5000);


};



