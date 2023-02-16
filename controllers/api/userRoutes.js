const router = require('express').Router();
const { User } = require('../../models');
const logger = require('../../public/js/logger');

// Route for submitting new user data to idea_db.
router.post('/', async (req, res) => {
  logger.info('Attempting to create a new user');
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      logger.info('A valid user was created');
    });
  } catch (err) {
    res.status(400).json(err);
    logger.error('A bad request was sent to the user post route');
  }
});

// Route for logging in as a user.
router.post('/login', async (req, res) => {
  logger.info('Attempting to log in a user');
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      logger.warn('A user attempted to log in with an incorrect name or password');
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // Error handling if someone without credentials tries logging in.
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      logger.warn('A user attempted to log in with an incorrect name or password');
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      logger.info('A user successfully logged in');
    });
  } catch (err) {
    res.status(400).json(err);
    logger.error('A bad request was sent to the user login post route');
  }
});

// Route for logging out of a user's session.
router.post('/logout', (req, res) => {
  logger.info('Attempting to log out a user');
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      logger.info('A user was successfully logged out');
    });
  } else {
    res.status(404).end();
    logger.warn('An invalid session logged_in id was provided to be logged out');
  }
});

module.exports = router;
