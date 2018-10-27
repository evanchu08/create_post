const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const SALT_I = 10;
const passport = require('passport');
const validateRegisterInput  = require('../validators/register');
const validateLogin = require('../validators/login');


router.post('/register', (req, res) =>{
    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if (!isValid){
        return res.status(400).json(errors)
    }

    const {name, password} = req.body
    const email = req.body.email.toLowerCase();
    User.findOne({email})
        .then(user =>{
            if (user){
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(email, {
                    s: '200', //size
                    r: 'pg',  //rating
                    d: 'mm'   //default
                });

                const newUser = new User({
                    name,
                    email,
                    password,
                    avatar
                });
                bcrypt.genSalt(SALT_I, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
                    
            }
        })
})

router.post('/login', (req, res) =>{
    const {errors, isValid} = validateLogin(req.body);
    
    if (!isValid){
        return res.status(400).json(errors)
    }
    const email = req.body.email.toLowerCase();
    const {password} = req.body;
    User.findOne({email})
        .then(user =>{
            if (!user) {
                errors.email = 'Email not exists'
                return res.status(404).json(errors)
            }
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if (isMatch){
                        const payload = {id: user.id, name: user.name, avatar: user.avatar};

                            jwt.sign(
                                payload,
                                process.env.SECRET,
                                { expiresIn: '24h'},
                                (err, token) =>{
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    });
                                })
                                
                    } else {
                        errors.password = 'Password not correct'
                        return res.status(400).json(errors)
                    }
                })
        })
    })

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) =>{
            res.json({
                id: req.user.id,
                email: req.user.email,
                name: req.user.name
            });
        }
    )



module.exports = router