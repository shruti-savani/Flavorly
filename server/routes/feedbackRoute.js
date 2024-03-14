const Router = require("express")
const feedbackControllers = require("../controllers/feedbackControllers")

const router = Router();

router.post("/feedback", feedbackControllers.feedback_post)

module.exports = router;