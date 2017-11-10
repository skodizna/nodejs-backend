'use strict';
var request = require('request');
var cheerio = require('cheerio');
var Items = require('../models/restaurantListModel'); //created model loading here
var mongoose = require('mongoose'),
    Restaurant = mongoose.model('Items');

var test = true;

function scrape_restaurants(req, res) {

    scrapeThem();

    setTimeout(function(){
        if (test) {
            res.send('ok');
        } else {
            res.send('Check console !!');
        }
    }, 5000);


};


function scrapeThem() {
    var restaurants = new Object();
    restaurants.item = [];

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    // Twenty7
    var url = 'http://twenty7.cz/menu';
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        var restaurant = new Object();
        restaurant.name = "Twenty7";
        restaurant.web = "http://twenty7.cz/";
        restaurant.menu = [];

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var titleObject, priceObject;

            $('.hlavni-chod').filter(function(){
                var data = $(this);


                titleObject = data.children('strong:not(".hlavni-chod-title")');
                priceObject = data.children('.price');
                for (var i = 0; i < titleObject.length; i++ ) {
                    var food = new Object();
                    //console.log($(titleObject[i]).text());
                    food.name = $(titleObject[i]).text();
                    food.price = $(priceObject[i]).text();
                    //food.push({title : $(titleObject[i]).text(), price : $(priceObject[i]).text()});
                    restaurant.menu.push(food);
                };

                //console.log(restaurant);
                //console.log(JSON.stringify(restaurant));
            });




        } else {
            restaurant.menu =false;
            console.log(error);
        }

        // ulozeni do DB
        saveItem(restaurant);


    })

    // Motoburger
    url = 'https://www.motoburger.cz/';
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        var restaurant = new Object();
        restaurant.name = "Motoburger";
        restaurant.web = "https://www.motoburger.cz/";
        restaurant.menu = [];

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var titleObject, priceObject;

            $('#polmenu').filter(function(){
                var data = $(this);


                titleObject = data.find("td");

                for (var i = 1; i <= ((titleObject.length-6)/2); i++ ) {
                    var food = new Object();
                    //console.log($(titleObject[i]).text());
                    if (data.find("#td"+i+" >a").text() != '') {
                        food.name = data.find("#td"+i+" >a").text();
                        food.price = data.find("#td"+i).siblings('td').text();
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
        saveItem(restaurant);


    })



    // Hamburg
    var url = 'http://www.restauracehamburg.cz/';
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        var restaurant = new Object();
        restaurant.name = "Hamburg restaurant";
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
        saveItem(restaurant);
        //console.log(restaurant);

    })
}




function saveItem(restaurant) {
    var now = new Date();
    var new_item = new Restaurant({
        "name" : restaurant.name,
        "web" : restaurant.web,
        "menu" : restaurant.menu,
        "type" : 'backup'
    });
    new_item.save(function(err, task) {
        if (err) {
            console.log(err);
            test = false;
        }
        //console.log(task);
        //res.json(task);
    });

    Restaurant.findOneAndUpdate(
        {name: restaurant.name, type: "today"},
        {menu: restaurant.menu, Created_date: now}, {new: true}, function(err, task) {
            if (err) {
                console.log(err);
                test = false;
            }

            //res.json(task);
        });
}

module.exports = {
    scrapeThem: scrapeThem,
    scrape_restaurants: scrape_restaurants,
    saveItem: saveItem
}

