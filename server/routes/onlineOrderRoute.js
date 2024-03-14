const Router = require('express')
const onlineOrderControllers = require('../controllers/onlineOrderControllers')
const requireAuth = require("../middle/requireAuth")

const router = Router()

router.use(requireAuth)

router.post('/delivery-summary', onlineOrderControllers.online_order_post)

module.exports = router;