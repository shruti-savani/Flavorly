const Order = require("../models/Order")

module.exports.order_post = async (req, res) => {
    try {
        const {table, items, totalAmount} = req.body;

        const order = new Order({
            table,
            items,
            totalAmount,
        })

        await order.save();

        res.status(201).json({success: true, message: "Order placed successfully!"})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "error placing the order."})
    }
}