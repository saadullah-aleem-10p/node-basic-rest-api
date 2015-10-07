'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

app.use(bodyParser.json());
app.use(expressValidator({
    customValidators: {
        isPhoneNumber: function (value) {
            return (value[0] == '0' && value[1] == '3' && value[2] < 5 && value.length < 12)
        }
    }
}));
app.use(bodyParser.urlencoded({ extended: true}));

var port = process.env.PORT || 8000;

// initializing router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Hittain arahi hai, yawr.');
    next(); // make sure we go to the next routes and don't stop here
});

// connecting to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/node_rest_api');

// including routes from other files
var userRoutes = require('./routers/users.js');
var itemRoutes = require('./routers/items.js');


router.get('/', function(req, res){
    res.json({ message: 'Apparently, this is a REST API'});
});

// registering all the routes
app.use('/api', router, userRoutes, itemRoutes);

app.listen(port);
console.log("API running on port " + port + ". Yeeeeeeeeeeea boiiiiiii!");