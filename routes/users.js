const express = require("express");
const User = require("../models/userModel");
const { siginIn, register, customers } = require("../controllers/usersController");
const auth = require("../middlewire/authChekcer");

const router = express.Router();

router.post("/signin", siginIn);
router.post("/register", register);
router.get("/customers", customers);

module.exports = router;
