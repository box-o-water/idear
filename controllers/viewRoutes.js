const router = require('express').Router();
const { request } = require('express');
const { Idea, User, Choice, Vote } = require('../models');
const withAuth = require('../utils/auth');
const logger = require('../public/js/logger');

// router.put('/vote', async (req, res) => {
//   try {
//     let choice_id = req.body.id.split("_")[1]; 
//     if (req.body.up === "true" && req.body.down ==="0" ){
//     console.log(req.data); 
//     await Choice.increment('votes', { by: 1, where: { id: choice_id }})
//     } else if (req.body.down === "true" && req.body.down ==="0"){
//     await Choice.decrement('votes', { by: 1, where: { id: choice_id }})
//     } else if (req.body.up === "false" && req.body.down ==="0"){
//       await Choice.decrement('votes', { by: 1, where: { id: choice_id }})
//     } else if (req.body.down === "false" && req.body.down ==="0"){
//       await Choice.increment('votes', { by: 1, where: { id: choice_id }})
//     }  else if (req.body.up === "false" && req.body.down ==="true"){
//       await Choice.decrement('votes', { by: 2, where: { id: choice_id }})
//     } 


//     res.status(200).json({ message: choice_id });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Route to get a list of ideas.
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

// Route to get a specific 'idea' by its ID in the params.
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

  for ( let i = 0; i < idea.choices.length; i++){
    idea.choices[i]['downvote'] = '';
    idea.choices[i]['upvote'] = ''; 
    if (req.session.user_id){ 
      let user_choices = await Vote.findOne({ where: {
        user_id: req.session.user_id,
        choice_id: idea.choices[i].id
          }, 
        raw: true
        }); 
      console.log(user_choices); 
      if (user_choices){
        if (user_choices.vote === 'upvoted'){
         idea.choices[i]['upvote'] = 'on'; 
        } else if (user_choices.vote === 'downvoted'){
         idea.choices[i]['downvote'] = 'on'; 
        } 
      }
    }
  }
  console.log(idea.choices); 

    
    // for ( let i =0; i < idea.choices.length; i ++){
      
    //   idea.choices[i]['upvote'] = 'on'; 
    // } 

    // console.log(idea.choices); 
    
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

// Router that takes users to the login screen.
router.get('/login', (req, res) => {
  logger.info('Attempting to validate if a specific user is logged in or not');
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    logger.info('A users profile was rendered after validating the user is still logged in');
    return;
  }
  // Rendering login.handlebars
  res.render('login');
  logger.info('A logged out user was redirected to login when attempting to view their profile');
});

module.exports = router;
