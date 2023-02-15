const router = require('express').Router();
const { Idea, User, Choice } = require('../models');
const withAuth = require('../utils/auth');
const logger = require('../public/js/logger');

router.get('/', async (req, res) => {
  logger.info('Attempting to render a list of ideas');
  try {
    // Get all ideas and JOIN with user data
    const data = await Idea.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const ideas = data.map((idea) => idea.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      ideas,
      logged_in: req.session.logged_in,
    });
    logger.info('A list of ideas was rendered');
  } catch (err) {
    res.status(500).json(err);
    logger.crit('A server error occurred while attempting to render a list of ideas');
  }
});

router.get('/idea/:id', async (req, res) => {
  logger.info('Attempting to render a specific idea');
  try {
    const data = await Idea.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Choice,
        },
      ],
    });

    const idea = data.get({ plain: true });

    res.render('idea', {
      ...idea,
      logged_in: req.session.logged_in,
    });
    logger.info('A specific idea was rendered');
  } catch (err) {
    res.status(500).json(err);
    logger.crit('A server error occurred while attempting to render a specific idea');
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  logger.info('Attempting to render a specific user profile');
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Idea }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
    logger.info('A specific profile was rendered');
  } catch (err) {
    res.status(500).json(err);
    logger.crit('A server error occurred while attempting to render a profile');
  }
});

router.get('/login', (req, res) => {
  logger.info('Attempting to validate if a specific user is logged in or not');
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    logger.info('A users profile was rendered after validating the user is still logged in');
    return;
  }

  res.render('login');
  logger.info('A logged out user was redirected to login when attempting to view their profile');
});

module.exports = router;
