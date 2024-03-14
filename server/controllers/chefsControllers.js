const Chef = require('../models/Chef')

module.exports.chef_get = async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    }
    catch {
        res.status(500).json({ error: error.message});
    }
}