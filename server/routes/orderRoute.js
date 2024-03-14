const Router = require("express")
const orderControllers = require("../controllers/orderControllers")

const router = new Router()

router.post("/order", orderControllers.order_post);

module.exports = router;