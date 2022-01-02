/*
const Post = require("../models/Post");


exports.getAllPosts = async (req, res) => {
    res.json({success:true, posts:[]})
}
// Auth route
exports.createPost = async (req, res) => {
    let { content } = req.body;
    const { id } = req.payload;

    if(content.length < 6) throw "content must be atleast 10 characters long";
    let post = new Post({user:id, content})  
    await post.save()
    res.status(201).json({success:true, post})

}

exports.getSinglePost = async (req, res) => {
    let _id = req.params.id;
    const post = await Post.findOne({
        _id
    })
    res.json({success:true, post})
    
}

exports.editPost = async (req, res) => {
    let _id = req.params.id;//this is the post id
    let { id } = req.payload; //this is the id of the user
    let { content } = req.body;

    if(content.length < 6) throw "content must be atleast 10 characters long";
    let userPostExist = await Post.findOne({_id, user:id})
    if(!userPostExist) throw "user post does not exist"

    let options = {
        new: true,
        omitUndefined: true
    }
    let post = await Post.findByIdAndUpdate(_id, content, options);
    res.json({success:true, post})
}

*/ 