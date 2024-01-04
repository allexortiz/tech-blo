const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user using the provided data in the request body
    const userData = await User.create(req.body);

    // Save user information in the session and mark the user as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with a redirect to the profile page
      res.redirect('/profile');
    });
  } catch (err) {
    // Handle errors and respond with a 400 status code
    res.status(400).json(err);
  }
});

// GET one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find a user by their email address in the database
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user is found, respond with an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password matches the user's password
    const validPassword = userData.checkPassword(req.body.password);

    // If the password is invalid, respond with an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user information in the session and mark the user as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with a success message and the user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handle errors and respond with a 400 status code
    res.status(400).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.status(204).end(); // Respond with a 204 status code (No Content)
    });
  } else {
    // If the user is not logged in, respond with a 404 status code (Not Found)
    res.status(404).end();
  }
});

module.exports = router;