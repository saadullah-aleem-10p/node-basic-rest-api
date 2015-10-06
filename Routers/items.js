var Item = require('../models/items.js');
var express = require('express');
var itemRouter = express.Router();

itemRouter.route('/items')

    .get(function(req, res){
        Item.find(function(err, items){
            if (err)
                res.send(err);
            res.json({"data" : items})
        })
    })

    .post(function(req, res){
        var item = new Item();
        item.title = req.body.title;
        item.price = req.body.price;
        item.isNegotiable = req.body.isNegotiable;
        item.hasPictures = req.body.hasPictures;
        item.phone = req.body.phone;
        item.description = req.body.title;
        item.save(function(err) {
            if (err)
                res.send(err);

            res.json(item)
        });
    });

itemRouter.route('/items/:item')

    .get(function(req, res){
        Item.findById(req.params.item, function(err, item){
            if (err)
                res.send(err);

            res.json(item)
        })
    });

module.exports = itemRouter;