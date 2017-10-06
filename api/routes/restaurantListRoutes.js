'use strict';
module.exports = function(app) {
    var restaurants = require('../controllers/restaurantListController');
    var scrape = require('../controllers/restaurantScrapeController');
    var scrapeTest = require('../controllers/restaurantScrapeTestController');

    // todoList Routes
    app.route('/items')
        .get(restaurants.list_all_items)
        .post(restaurants.create_an_item); // zatim k nicemu

    app.route('/today-items')
        .get(restaurants.list_today_items)
        .post(restaurants.create_today_item); // zatim k nicemu


    app.route('/items/:itemId')
        .get(restaurants.read_an_item)
        .put(restaurants.update_an_item)
        .delete(restaurants.delete_an_item); // tohle nebude

    app.route('/scrape')
        .get(scrape.scrape_restaurants);

    app.route('/scrape-test')
        .get(scrapeTest.scrape_restaurants);
};