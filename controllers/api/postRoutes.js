const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post (requires authentication)
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post using the provided data in the request body
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Respond with the newly created post
    res.status(200).json(newPost);
  } catch (err) {
    // Handle errors and respond with a 400 status code
    res.status(400).json(err);
  }
});

// Route to delete a post by ID (requires authentication)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a post based on the provided ID and user ID (for security)
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // Check if the post was found and deleted
    if (!postData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    // Respond with a success message
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

module.exports = router;