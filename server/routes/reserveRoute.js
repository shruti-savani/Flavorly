const Router = require("express")
const ReserveControllers = require( "../controllers/ReserveControllers" )

const router = Router()

router.post("/about", ReserveControllers.reserve_post);

module.exports = router;