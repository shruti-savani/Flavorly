const Router = require("express")
const menuItemControllers = require("../controllers/menuItemControllers")

const router = Router()

router.get ("/menu", menuItemControllers.menuItem_get);

module.exports = router