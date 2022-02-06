import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    console.log ( req.body ) ;

    const newPostMessage = new PostMessage({ ...post, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;

    const fnl = req.body;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   const updatedPost = fnl ;

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const  post_id  = req.params.id;
    const user_id = req.body.result._id ;
    console.log ( post_id ) ;console.log ( user_id  ) ;
    if (!mongoose.Types.ObjectId.isValid(post_id)) return res.status(404).send(`No post with id: ${post_id}`);

    const post = await PostMessage.findById(post_id);

    const index = post.likes.findIndex((id) => id === user_id );

    if (index === -1) {
      post.likes.push(user_id);
    } else {
      post.likes = post.likes.filter((id) => id !== user_id );
    }
    const updatedPost = await PostMessage.findByIdAndUpdate( post_id , post, { new: true });
    res.status(200).json(updatedPost);
}


export default router;
