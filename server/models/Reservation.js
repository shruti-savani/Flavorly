const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter your name"]},
  phone: { type: Number, required: [true, "Please enter your phone number"] },
  people: { type: Number, required: [true, "Please enter number of people"] },
  date: { type: String, required: [true, "Please enter date"] },
  time: { type: String, required: [true, "Please enter time"] },
});

const Reserve = mongoose.model("Reservation", reserveSchema);

module.exports = Reserve;
