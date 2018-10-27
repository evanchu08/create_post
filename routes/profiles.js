const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../models/profile');
const User = require('../models/user');
const mongoose = require('mongoose');
const validateProfile = require('../validators/profile');
const validateExperience = require('../validators/experience');
const validateSchool = require('../validators/school');

router.get('/', passport.authenticate('jwt', {session: false}), 
    (req, res) =>{
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile =>{            
            if (!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile) 
        })
        .catch(err => res.status(404).json(err)) 
})

//get all Profiles
router.get(('/all'), (req, res) =>{
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles){
                errors.noprofile = 'There are no profiles';
                res.status(404).json(errors);
            }
            res.json(profiles);
        }).catch(err => res.status(404).json({profile: 'No profiles '}))
})

//get by user_id
//public router
router.get(('/user/:user_id'), (req, res) =>{
    const errors = {};
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile){
                errors.noprofile = 'No profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile)
        }).catch(err => res.status(404).json({profile: 'No profile for this user'}))
})



//get by handle
//public router
router.get(('/handle/:handle'), (req, res) =>{
    const errors = {};
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile){
                errors.noprofile = 'No profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile)
        }).catch(err => res.status(404).json(err))
})

// add experience to profile
// private router
router.post('/experience',  passport.authenticate('jwt', {session: false}), 
        (req, res) =>{
            const {errors, isValid} = validateExperience(req.body);
            if (!isValid){
                return res.status(400).json(errors)
            }

            Profile.findOne({user: req.user.id})
                .then(profile =>{
                    const {title, company, location, from, to, current, description} = req.body
                    const  newExp = {
                        title, company, location, from, to, current, description
                    } 
                    profile.experience.unshift(newExp);
                    profile.save().then(profile => res.json(profile))
                }).catch(err => res.status(404).json(err))
        })

// add school to profile
// private router       
router.post('/school', passport.authenticate('jwt', {session: false}),
    (req,res) =>{
        const {errors, isValid} = validateSchool(req.body);
            if (!isValid){
                return res.status(400).json(errors)
            }
        Profile.findOne({user: req.user.id})
            .then(profile => {
                const {school, degree, fieldofstudy, from, to, current, description} = req.body;
                const newProfile = {
                    school, degree, fieldofstudy, from, to, current, description
                }
                //use unshift begin, not push

                profile.education.unshift(newProfile)
                profile.save().then(school => res.json(school))                    
            }).catch(err => res.status(404).json(err))
})

// edit or update Profile
// private router
router.post('/',  passport.authenticate('jwt', {session: false}), 
             (req, res) =>{
    const {errors, isValid} = validateProfile(req.body);
    if (!isValid){
        return res.status(400).json(errors)
    }
    const profileFields = {};
   
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
    if (typeof req.body.skills !== 'undefined') 
        profileFields.skills = req.body.skills.split(',')

    //social    
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            if (profile){
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ).then(profile => res.json(profile))
                
            } else {
                Profile.findOne({handle: profileFields.handle})
                    .then(profile =>{
                        if (profile){
                            errors.handle = 'That handle already exists'
                            res.status(400).json(errors);
                        } else {
                            new Profile(profileFields).save()
                                .then(profile => res.json(profile))
                        }
                    })
            }
        })
})

//delete experience
//private router
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        Profile.findOne({user: req.user.id})
            .then(profile => {
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id)
                profile.experience.splice(removeIndex, 1)
                profile.save().then(profile => res.json(profile))
            }).catch(err => res.status(404).json(err))
})

//delete education
//private router
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        Profile.findOne({user: req.user.id})
            .then(profile =>{
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id)
                profile.education.splice(removeIndex, 1);
                profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err))
    })

//delete profile and user
//private router
router.delete('/', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        Profile.findOneAndRemove({user: req.user.id})
            .then(() =>{
                User.findOneAndRemove({_id: req.user.id}).then(() =>{
                    res.json({success: true})
                })
            })
    })

module.exports = router