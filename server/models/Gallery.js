const mongoose = require('mongoose')

const GalleryItem = new mongoose.Schema({
    image: {type: String, required: true},
    title: {type: String}
})

const Gallery = mongoose.model('Galleryphoto', GalleryItem)

module.exports = Gallery;