const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');
const { route } = require('./auth');

//@routes GET api/posts
//@desc Get post
//@access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username', 'createdAt']);
        res.json({ success: true, posts });
    } catch (err) {
        console.log(err.message);
    }
})


//@routes PUT api/posts
//@desc Update post
//@access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })
    }

    try {
        let updatePost = {
            title,
            description: description || '',
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }

        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId
        }

        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });

        if (!updatePost) {
            return res.status(401).json({ success: false, message: "Can't not update post" })
        }

        res.status(401).json({ success: true, message: "Update Success", post: updatePost })
    } catch (err) {
        console.log(err.message);
    }
})

//@routes DELETE api/posts
//@desc Delete post
//@access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }

        const deletePost = await Post.findOneAndDelete(postDeleteCondition);

        if (!deletePost) {
            return res.status(401).json({ success: false, message: "Can't not delete post" })
        }

        res.status(401).json({ success: true, message: "Delete Success", post: deletePost })
    } catch (err) {
        console.log(err.message);
    }
})

//@routes POST api/posts
//@desc Create post
//@access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })
    }

    try {
        const newPost = new Post(
            {
                title,
                description,
                url: (url.startsWith('https://')) ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            }
        )

        await newPost.save();

        res.json({ success: true, message: "Create Successfully", post: newPost })
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;