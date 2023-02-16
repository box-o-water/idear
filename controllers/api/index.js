const router = require('express').Router();

const userRoutes = require('./userRoutes');
const ideaRoutes = require('./ideaRoutes');
// const choiceRoutes = require('./choiceRoutes');

router.use('/users', userRoutes);
router.use('/ideas', ideaRoutes);
// router.use('/choices', choiceRoutes);

module.exports = router;
