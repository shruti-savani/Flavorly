const Gallery = require('../models/Gallery')

module.exports.gallery_get = async (req, res) => {
    try {
        const GalleryItem = await  Gallery.find()
        res.json(GalleryItem)
    }
    catch {
        res.status(500).json({error: error.message})
    }
}