const Reservation = require("../models/Reservation")

module.exports.reserve_post = async (req, res) => {
    try {
        const { name, phone, people, date, time } = req.body;

        if (!name || !phone || !people || !date || !time) {
            return res.status(400).json({error: "Incomplete Data"})
        }

        const dateObject = new Date(date)

        const formattedDate = dateObject.toISOString().split("T")[0]

        const newReservation = new Reservation({ name, phone, people, date: formattedDate, time })

        await newReservation.save();
        res.status(201).json({ success: true });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}