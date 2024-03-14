const MenuItem = require("../models/MenuItem")

module.exports.menuItem_get = async (req, res) => {
    try {
      const menuItems = await MenuItem.find();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }