// Importing the Express Router and required models and middleware
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage with a list of blogs
router.get('/', async (req, res) => {
  try {
    // Fetch all blogs with associated user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    // Map the blog data to plain JavaScript objects
    const post = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with blogs and session information
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json(err);
  }
});

// Route to render a specific blog post by ID
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a specific blog post with associated user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Get the plain JavaScript object representing the blog post
    const post = postData.get({ plain: true });

    // Render the blog template with blog details and session information
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json(err);
  }
});

// Route to render the user's profile (requires authentication)
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Fetch user data, excluding the password, and including associated projects
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Get the plain JavaScript object representing the user
    const user = userData.get({ plain: true });

    // Render the profile template with user details and session information
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).json(err);
  }
});

// Route to render the login page or redirect to the user's profile if already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // Redirect to the profile page if the user is already logged in
    res.redirect('/profile');
    return;
  }

  // Render the login page
  res.render('login');
});

// Export the router for use in other modules
module.exports = router;