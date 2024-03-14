const Route = require('express')
const UsersControllers = require('../controllers/UsersControllers')
const requireAuth = require("../middle/requireAuth")

const router = Route()

router.post ('/signup', UsersControllers.signup_post);
router.post ('/login', UsersControllers.login_post);

router.use(requireAuth)

router.get ('/user-details/:id', UsersControllers.user_get);
router.post ('/user-details/:id', UsersControllers.user_details_edit);
router.get ('/user-details/history/:id', UsersControllers.online_order_get);

module.exports = router