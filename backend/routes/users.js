const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const secretKey = require("../config/config").secretKey;

const User = require("../models/User");

router.post("/register", (req, res) => {
    User.findOne({ username: req.body.username}).then(user => {
        if(user) {
            return res.status(400).json({ username: "username already in use"});
        } else {
            const newUser = new User({        
                username: req.body.username,
                password: req.body.password
            });
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    })
})

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then(user => {
        if(!user) {
            return res.status(404).json({ usernotfound: "user not found" });
        } else {
            if( user.password == password) {
                const payload = {
                    id: user.id,
                    username: user.username
                };
                jsonwebtoken.sign(payload, secretKey, { expiresIn: 3600}, (err, token) => {  
                    var decoded = jsonwebtoken.verify(token, secretKey);     //remove                                 
                    res.json({ token: token, decodedusername: decoded.username })
                });                
            } else {
                return res.status(400).json({ incorrectpassword: "incorrect password" });
            }
        }
    })
})

module.exports = router;