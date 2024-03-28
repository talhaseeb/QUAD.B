const mongoose = require('mongoose');
const Post = require('../models/post.model');
const Partner = require('../models/partner.model');
const Notification = require('../models/notification.model');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.getPostsByPartner = async (req, res) => {
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found!" })
        }

        const posts = await Post.find({ partnerId: partnerId });
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.createPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found!" })
        }

        const newPost = new Post({
            partnerId,
            title,
            description,
            image: imageUrl
        })
        await newPost.save();
        return res.status(200).json({ message: "Post created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.updatePost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        const updatedPost = {
            title,
            description,
            image: imageUrl
        }
        await Post.findByIdAndUpdate(
            postId,
            updatedPost,
            { new: true }
        )
        return res.status(200).json({ message: "Post updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}