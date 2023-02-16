const router = require('express').Router();

const userRoutes = require('./userRoutes');
const ideaRoutes = require('./ideaRoutes');
const voteRoutes = require('./voteRoutes'); 
const { route } = require('./userRoutes');
// const choiceRoutes = require('./choiceRoutes');

// Middleware for userRoutes, ideaRoutes, and voteRoutes
router.use('/users', userRoutes);
router.use('/ideas', ideaRoutes);
 router.use('/vote', voteRoutes); 
// router.use('/choices', choiceRoutes);

module.exports = router;
