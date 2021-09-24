const Post = require('../models/post.model')
const multer = require('../../multer')

require('dotenv').config()

const HATEOAS = process.env.HATEOAS;

const index =  async (req, res) => {
    try {
        // let posts = await Post.find({}).select(['title', 'body']).lean()
        let posts = await Post.aggregate([
            {"$project" : {
                "title": "$title",
                "body" : "$body",
                "url": {
                    "$concat": [`${HATEOAS}`, {
                        "$convert": {
                            "input": "$_id", "to":"string"
                        }
                    }]
                }
            }, }
        ])
        if(posts.length > 0){
            let count = posts.length
            res.send({data:count, status:200,posts:posts})
        }else{
            res.send({message:'Post still 0'})
        }
            
    } catch (error) {
        console.log(error)        
    }
}

const create = async (req, res) => {
    let {title, body} = req.body;
    console.log(title)
    let post = new Post({
        title: title,
        body: body
    })
    try {
        const createpost =  await post.save();
        res.send({status:201, message: "Create post success", post: createpost})
    } catch (error) {
        console.log(error)
    }
}

const show = async (req, res) => {
    let id = req.params.id
    const post = await Post.findById(id).select(['title', 'body']).lean()
    if(post == null){
        res.status(404).send({status: 404, message:"Data is not found"})
    }else{
        res.send({status: 200, post:post})
    }
}

const update = async (req, res) => {
    let id = req.params.id
    let {title, body} = req.body
    let update, status, message;
    try {
        const post = Post.findById(id)
        if(post == "{}"){
            status = 404
            message = "Data not found"
        }else{
            update = await post.update({
                title:title,
                body:body
            })
            status = 201
            message = "Update post success"
        }
        res.send({message:message, status:status})        
    } catch (error) {
        console.log(error.message)
    }
}

const destroy = async (req, res) => {
    let id = req.params.id
    let status, message;
    try {
        const post = await Post.findByIdAndDelete(id)
        if(post){
            status = 201
            message = "Delete post success"
        }else{
            status = 404
            message = "Data is not found"
        }
        res.send({status:status, message:message, post:post})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {index, create, show, update, destroy}