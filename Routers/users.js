var userRouter = express.Router();

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

module.exports.userRouter = userRouter;