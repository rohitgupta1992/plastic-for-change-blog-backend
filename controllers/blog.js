// controllers/blog.js
const { json } = require('express');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User')

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  const { title, content } = req.body;
console.log(req.user.id,req.user)
  const author = req.user.userId; // assuming user is authenticated

  try {
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
    });

    await newBlogPost.save();
    console.log(newBlogPost)
    
    const user = await User.findById(req.user.userId);

    user.blog.unshift(newBlogPost._id);

    await user.save();

    res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  console.log(req.user,req.params)
  try {
    const blogPosts = await BlogPost.find().populate('author', 'name email');
    res.json(blogPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// delete Blog by id
exports.deleteBlog = async (req, res) => {
  console.log("del",req.user,req.params)
  try {
    const blog = await BlogPost.findById(req.params.id);
    console.log(blog)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    

    await BlogPost.findByIdAndDelete(req.params.id)

    const user = await User.findById(req.user.userId);

    const index = user.blog.indexOf(req.params.id);
    user.blog.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Blog
exports.UpdateBlog = async(req,res)=>{
console.log("",req.user,req.parms)
try {
  const item = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
} catch (error) {
  res.status(400).send(error);
}
}

// Get By ID blog

exports.GetoneBlog = async(req,res)=>{
  console.log("Blog not found",req.user,req.params);

  try{
    const blog = await BlogPost.findById(req.params.id)
    console.log(blog)
    if(!blog){
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    console.log("called")
    res.status(200).json({
      success: true,
      message: "Blog deleted",
      blog:blog
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

