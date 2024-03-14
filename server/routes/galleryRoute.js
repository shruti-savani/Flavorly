const Route = require('express')
const galleryController = require('../controllers/galleryControllers')

const router = Route()

router.get('/gallery', galleryController.gallery_get);

module.exports = router