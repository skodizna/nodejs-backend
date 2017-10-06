'use strict';


var mongoose = require('mongoose'),
    Item = mongoose.model('Items');

exports.list_today_items = function(req, res) {
    Item.find({
        "type" : "today"
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.create_today_item = function(req, res) {
    var new_item = new Item(req.body);
    new_item.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.list_all_items = function(req, res) {
    Item.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.create_an_item = function(req, res) {
    var new_item = new Item(req.body);
    new_item.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_an_item = function(req, res) {
    Item.findById(req.params.itemId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_an_item = function(req, res) {
    Item.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_an_item = function(req, res) {


    Item.remove({
        _id: req.params.itemId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};

