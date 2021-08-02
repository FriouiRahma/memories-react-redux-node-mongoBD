const express = require("express")
const PostMessage = require("../models/postMessage")

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).send(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post('/post', async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})



module.exports = router;