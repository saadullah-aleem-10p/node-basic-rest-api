var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Someone made an API call.');
    next(); // make sure we go to the next routes and don't stop here
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/node_rest_api');

var User = require('./models/users.js');
var Item = require('./models/items.js');


router.get('/', function(req, res){
    res.json({ message: 'Apparently, this is a REST API'});
});

router.route('/users')

    .post(function(req, res){
        var user = new User();
        console.log(req.body);
        user.name = req.body.name;
        if (req.body.name === undefined) {
            res.json({Error: "Cannot create user with no name."});
            res.sendStatus(400);
        }
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json(user)
        });
    })

    .get(function(req, res){
        User.find(function(err, users){
            if (err)
                res.send(err);

            res.json({"data" : users})
        })
    });

router.route('/users/:user')

    .get(function(req, res){
        User.findById(req.params.user, function(err, user){
            if (err)
                res.send(err);

            res.json(user)
        })
    })

    .put(function(req, res){
        User.findById(req.params.user, function(err, user){
            if (err)
                res.send(err);

            user.name = req.body.name;
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json(user);
            })
        })
    })

    .delete(function(req, res){
        console.log(req.params.user);
        User.remove({_id : req.params.user}, function(err){
           if (err)
               res.send(err);

           res.sendStatus(204);
        });

   });

router.route('/items')

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
        //if (req.body.name === undefined) {
        //    res.json({Error: "Cannot create user with no name."});
        //    res.sendStatus(400);
        //}
        item.save(function(err) {
            if (err)
                res.send(err);

            res.json(item)
        });
    });

router.route('/items/:item')

    .get(function(req, res){
        Item.findById(req.params.item, function(err, item){
            if (err)
                res.send(err);

            res.json(item)
        })
    });

app.use('/api', router);

app.listen(port);
console.log("API running on port " + port);