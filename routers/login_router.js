const express = require('express');
const router = express.Router();

const crypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const Users = require('../models/user.model');
    router.get('/', (req, res) => {
        res.redirect("/");
    });

    router.post('/Login', (req, res) => {
    const Username = req.body.username;
    const pwrd = req.body.password;

    if (!Username || !pwrd) {
        let msg = "Something wrong with username/password";
        res.status(401).json({msg: msg});
        return;
    }



    Users.findOne( { username: req.body.username }, function(err, user){
        if(err){
            console.log(err);
            res.status(401).json(err);
        } else if(user){
            console.log(user);
            AuthUser(user);
        } else {
            res.status(401).json({msg: "Cannot find user"})
        }
    });


    function AuthUser(user) {
        crypt.compare(pwrd, user.password, (err, result) => {
            if(err){
                console.log(err);
            }
            if (result) {
                let expirationDate = Math.floor(Date.now() / 1000) + 3600;
                const Payload = {
                    username: user.username,
                    password: user.password
                };

                const token = jwt.sign({Payload, exp: expirationDate}, process.env.JWT_SECRET);
                console.log(token);
                res.json({
                    msg: 'Match',
                    token: token
                });
            }
            else res.status(401).json({msg: "Passwords don't match"})
        });
    }
});

module.exports = router;

