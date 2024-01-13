const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post (requires authentication)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a post by ID (requires authentication)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a post by ID (requires authentication)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new comment on a post (requires authentication)
router.post('/:id/comment', withAuth, async (req, res) => {
  try {
      if (req.session) {
          const dbCommentData = await Comment.create({
              comment_text: req.body.comment_text,
              post_id: req.params.id,
              user_id: req.session.user_id,
          });
          res.status(201).json({ status: 'success', data: { comment: dbCommentData } });
      }
  } catch (err) {
      console.error(err);
      res.status(400).json({ status: 'error', message: 'Failed to create comment' });
  }
});

module.exports = router;