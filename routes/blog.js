// routes/blog.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/blogs
router.post('/create', authMiddleware, blogController.createBlogPost);

// GET /api/blogs
router.get('/blogs',authMiddleware, blogController.getAllBlogPosts);
router
  .route("/blog/:id")
  .put(authMiddleware, blogController.UpdateBlog)
  .get(authMiddleware,blogController.GetoneBlog)
  .delete(authMiddleware, blogController.deleteBlog);

module.exports = router;
