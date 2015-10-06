var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

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
var itemRoutes = require('./routers/items.js')


router.get('/', function(req, res){
    res.json({ message: 'Apparently, this is a REST API'});
});

// registering all the routes
app.use('/api', router, userRoutes, itemRoutes);

app.listen(port);
console.log("API running on port " + port + ". Yeeeeeeeeeeea boiiiiiii!");