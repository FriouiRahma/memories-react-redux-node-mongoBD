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

router.post('/', async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

router.patch('/:id',async(req,res)=>{
    const {id}=req.params
    const { title, message, creator, selectedFile, tags } = req.body;
    
    const updatePost = { creator, title, message, tags, selectedFile };

     const updatedPost= await PostMessage.findByIdAndUpdate(id,updatePost,{new:true})
     console.log(req.body)
     res.json(updatedPost)
    
    
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    await PostMessage.findByIdAndRemove(id)
    res.json({message:'Post Deleted Succefully'})
})

router.patch('/:id/likePost',async(req,res)=>{
    const {id}=req.params
    const post= await PostMessage.findById(id)
    const updatedPost= await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true})
    res.json(updatedPost)
})


module.exports = router;