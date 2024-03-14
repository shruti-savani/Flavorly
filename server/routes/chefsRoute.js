const Route = require('express')
const chefsController = require('../controllers/chefsControllers')

const router = Route()

router.get('/about', chefsController.chef_get)

module.exports = router