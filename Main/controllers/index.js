const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home_routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;