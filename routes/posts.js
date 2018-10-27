const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/post');
const Profile = require('../models/profile');
const mongoose = require('mongoose');
const validatePost = require('../validators/post');

//create new Post
//Private route
router.post('/', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        const {errors, isValid} = validatePost(req.body);
        if (!isValid){
            return res.status(400).json(errors)
        }
        const {text, name, avatar} = req.body;      
        const newPost = new Post({
            text, 
            name,
            avatar,
            user: req.user.id
        })
        newPost.save().then(post => res.json(post))
    })


//get all Post
//Public route
router.get('/', (req, res) =>{
    const errors = {}
    Post.find()
        .sort({date: -1})
        .then(post =>{
            if (!post){
                errors.nopost =  'No post for this user';
                res.status(404).json(errors)
            }
            res.json(post)
        }).catch(err => res.status(404).json({nopost: 'No post found'}))
})
module.exports = router

//get single Post by Id
//Public route
router.get('/:id', (req, res) =>{
    Post.findById(req.params.id)
        .then(post =>{
            res.json(post)
        }).catch(err => res.status(404).json({nopost: 'No post found for this id'}))
})

//update single Post by Id
//private route
router.post('/update/:id', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        Profile.findOne({user: req.user.id})
            .then(() => {
                 Post.findById(req.params.id)
                    .then(() =>{
                        if (post.user.toString() !== req.user.id){
                            res.status(404).json({noAuth: 'No Authorization'});
                        }

                        const {errors, isValid} = validatePost(req.body);
                        if (!isValid){
                            return res.status(400).json(errors)
                        }
                        Post.findOneAndUpdate(
                            {_id: req.params.id},
                            {"$set": req.body},
                            {new: true}
                        ).then(post => res.json(post))
                    }).catch(err => res.status(404).json({nopost_noAuth: 'No post found for this id or No Authorization'}));
            }) .catch(err => res.status(404).json({nouser: 'No user found'}))        
    })


//delete single post by id
//private route
router.delete('/:id', passport.authenticate('jwt', {session: false}),
    (req, res) =>{
        Profile.findOne({user: req.user.id})
            .then(() =>{
                Post.findById(req.params.id)
                    .then(post =>{
                        if (post.user.toString() !== req.user.id){
                            res.status(404).json({noAuth: 'No Authorization'});
                        }
                        post.remove().then(() => res.json({success: true}))
                    }).catch(err => res.status(404).json({nopost: 'No post found for this id'}))
            }).catch(err => res.status(404).json({noProfile: 'No profile found for this user'}))
    })

// like 
// private route
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}),
	(req, res) =>{
		    Post.findById(req.params.post_id)
                    .then(post =>  {
                        const IndexOfUnlikeUser = post.unlikes.findIndex(
                            unlike => unlike.user.toString() === req.user.id
                        )
                        const IndexOflikeUser = post.likes.findIndex(
                            like => like.user.toString() === req.user.id
                        )
                        if (IndexOfUnlikeUser === -1 && IndexOflikeUser === -1){
                            post.likes.push({user: req.user.id})
                        } else if (IndexOfUnlikeUser !== -1 && IndexOflikeUser === -1){
                            post.unlikes.splice(IndexOfUnlikeUser, 1)
                        }
                        post.save().then(post => res.json(post))
                            .catch(err => res.status(404).json(err))
                    }).catch(err => res.status(404).json({noProfile: 'No profile found by this id'}))
                })

// unlike 
// private route
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}),
	(req, res) =>{
		    Post.findById(req.params.post_id)
                    .then(post =>  {
                        const IndexOfUnlikeUser = post.unlikes.findIndex(
                            unlike => unlike.user.toString() === req.user.id
                        )
                        const IndexOflikeUser = post.likes.findIndex(
                            like => like.user.toString() === req.user.id
                        )
                        if (IndexOfUnlikeUser === -1 && IndexOflikeUser === -1){
                            post.unlikes.push({user: req.user.id})
                        } else if (IndexOfUnlikeUser === -1 && IndexOflikeUser !== -1){
                            post.likes.splice(IndexOflikeUser, 1)
                        }
                        post.save().then(post => res.json(post))
                            .catch(err => res.status(404).json(err))
                    }).catch(err => res.status(404).json({noProfile: 'No profile found by this id'}))
                })

//add comment
//private route
router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        
        Post.findById(req.params.post_id)
            .sort({date: -1})
            .then(post =>{
                const {errors, isValid} = validatePost(req.body);
                if (!isValid){
                    return res.status(400).json(errors)
                }
                const {text, name, avatar} = req.body
                const newComment = {
                    user: req.user.id,
                    text,
                    name,
                    avatar
                }
                post.comments.push(newComment);
                post.save().then(post => res.json(post))
                            .catch(err => res.json(err))
            }).catch(err => res.status(404).json({noProfile: 'No profile found by this id'}))
    })

//delete comment by Id
    router.delete(
        '/:post_id/comment/:commentId',
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
          Post.findById(req.params.post_id)
            .then(post => {
              // Post not found
              if (!post) {
                return res.status(404).json({ postNotFound: 'Post not found' });
              }
                const IndexDeleteComment = post.comments.findIndex(comment => 
                    comment._id.toString() === req.params.commentId)
                if (IndexDeleteComment === -1){
                    return res.status(404).json({commentNotFound: 'Comment not found'})
                }
                post.comments.splice(IndexDeleteComment, 1);
                post.save().then(post => res.json(post))
                    .catch(err => res.status(400).json(err));                             
            }).catch(err => res.status(400).json(err));            
        }
      );

   
module.exports = router



/*    
     // Update the comments array with MongoDB's $pull operator
              post
                .update({ $pull: { comments: { _id: req.params.comment_id } } })
                .then(() => res.json({ deletedComment: 'Comment deleted' }))
                .catch(err => res.status(400).send(err));    


    Post.findOneAndUpdate(
        req.params.id,
        {
            $pull: { comments: { _id: req.params.comment_id, user: req.user.id } }
        },
        { new: true }
    )
    .then(post => res.json(post))
    .catch(err => res.status(400).send(err));
*/

