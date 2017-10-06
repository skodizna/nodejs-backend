var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var app     = express();
var port = process.env.PORT || 8081;
var Items = require('./api/models/restaurantListModel'); //created model loading here
var bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restaurants', {
    useMongoClient: true,
    /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var routes = require('./api/routes/restaurantListRoutes'); //importing route
routes(app); //register the route


app.listen(port)
console.log('Magic happens on port '+ port);
exports = module.exports = app;

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});