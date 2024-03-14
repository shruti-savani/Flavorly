const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  price: Number,
  category: String,
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;