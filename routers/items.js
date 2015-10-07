'use strict';

var util = require('util'),
    Item = require('../models/items.js'),
    express = require('express'),
    itemRouter = express.Router();

var errors_serializer = require('express-validator-errors');

itemRouter.route('/items')

    .get(function(req, res){
        Item.find(function(err, items){
            if (err)
                res.send(err);
            res.json({"data" : items})
        })
    })

    .post(function(req, res){
        // validate parameters received in body
        req.checkBody('title', 'title must be between 4 and 25 characters long.').len(4, 25);
        req.checkBody('price', 'price must be a number').isInt().notEmpty();
        req.checkBody('isNegotiable', 'isNegotiable must be True or False').isBoolean();
        req.checkBody('hasPictures', 'hasPictures must be True or False').isBoolean();
        req.checkBody('DatePosted', 'DatePosted must be a valid Date').notEmpty().isDate();
        req.checkBody('phone', 'phone must be a valid Pakistan phone number ').notEmpty().isPhoneNumber();

        // throws errors, if any occur
        var errors = req.validationErrors();
        if (errors) {
            res.status(400).json(errors_serializer.serialize(req));
            return;
        }

        // map received values to item object values
        var item = new Item();
        item.title = req.body.title;
        item.price = req.body.price;
        item.isNegotiable = req.body.isNegotiable;
        item.hasPictures = req.body.hasPictures;
        item.phone = req.body.phone;
        item.description = req.body.description;

        // save item to db
        item.save(function(err) {
            if (err)
                res.json(err);
            else
                res.json(item);
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