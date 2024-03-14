const mongoose = require("mongoose")

const OnlineOrderSchema = new mongoose.Schema({
    method: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String},
    pincode: {type: String},
    time: {type: String},
    items: [
        {
            name: {type: String, required: true},
            quantity: {type: String, required: true},
            price: {type: String, required: true},
        }
    ],
    totalamount: {type: Number, required: true},
    deliveryinstructions: {type: String},
    paymentmethod: {type: String, required: true},
    user_id: {type: String, required: true},
    orderdate: {type: String, required: true},
    ordertime: {type: String, required: true}
})

const OnlineOrder = mongoose.model('Onlineorder', OnlineOrderSchema)

module.exports = OnlineOrder;