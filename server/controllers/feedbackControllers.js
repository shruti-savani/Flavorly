const Feedback = require("../models/Feedback");

module.exports.feedback_post = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;

        if (!name || !email || !feedback) {
            return res.status(400).json({error: "Incomplete Data"})
        }

        const newFeedback = new Feedback({ name, email, feedback })

        await newFeedback.save();
        res.status(201).json({ success: true });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}