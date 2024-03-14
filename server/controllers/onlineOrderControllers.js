const OnlineOrder = require("../models/OnlineOrder");

module.exports.online_order_post = async (req, res) => {
  try {
    const { method , name, phone, address, pincode, time, items, totalamount, deliveryinstructions, paymentmethod, user_id, orderdate, ordertime } =
      req.body;
    const onlineOrder = new OnlineOrder({
      method,
      name,
      phone,
      address,
      pincode,
      time,
      items,
      totalamount,
      deliveryinstructions,
      paymentmethod,
      user_id,
      orderdate,
      ordertime
    });
    console.log("in server", req.body);

    await onlineOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "error placing the order." });
  }
};
