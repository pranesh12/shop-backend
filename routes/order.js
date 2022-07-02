const express = require("express");
const router = express.Router();
const { payment, allOrder, userOrder } = require("../controllers/OrderController");

router.post("/placeorder", payment);
router.get("/orderlist", allOrder);
router.get("/userOrder", userOrder);

module.exports = router;
