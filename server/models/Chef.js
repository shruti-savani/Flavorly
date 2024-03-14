const mongoose = require('mongoose')

const ChefItems = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    designation: {type: String, required: true},
    details: {type: String, required: true},
})

const Chef = mongoose.model('Chef', ChefItems);

module.exports = Chef;