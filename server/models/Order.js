const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    table: {type: Number, required: true},
    items: [
        {
            name: {type: String, required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        },
    ],
    totalAmount: {type: Number, required: true},
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order;