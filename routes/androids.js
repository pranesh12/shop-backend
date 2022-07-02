const express = require("express");
const {
  getAndroids,
  addAndroid,
  deleteAndroid,
  updateAndroid,
  getAndroid,
} = require("../controllers/androids");

const router = express.Router();

router.get("/androids", getAndroids);
router.post("/addandroid", addAndroid);
router.delete("/deleteAndroid/:id", deleteAndroid);
router.put("/android/:id", updateAndroid);
router.get("/single/:id", getAndroid);

module.exports = router;
