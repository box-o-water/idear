const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');

// Middleware for using the viewRoutes and apiRoutes.
router.use('/', viewRoutes);
router.use('/api', apiRoutes);

module.exports = router;
