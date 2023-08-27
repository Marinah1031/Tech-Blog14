const router = require('express').Router();

const userRoutes = require('./user_routes.js');
const postRoutes = require('./post_routes.js');
const commentRoutes = require('./comment_routes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;