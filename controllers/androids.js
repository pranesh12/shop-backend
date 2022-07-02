const { findOneAndDelete } = require("../models/androidModel");
const Android = require("../models/androidModel");

const getAndroids = async (req, res) => {
  try {
    const allAndroids = await Android.find({});
    res.status(200).json(allAndroids);
  } catch (error) {
    res.json(error);
  }
};

const getAndroid = async (req, res) => {
  try {
    const { id } = req.params;
    const android = await Android.findOne({ _id: id });
    res.status(200).json(android);
  } catch (err) {
    res.json(err);
  }
};

const addAndroid = async (req, res) => {
  try {
    const { name, img, shipping_pice, price } = req.body;
    await Android.create({
      name: name,
      img: img,
      shipping: shipping_pice,
      price: price,
    });
    res.status(200).send("successfull");
  } catch (error) {
    res.json(error);
  }
};

const updateAndroid = async (req, res) => {
  const { name, img, shipping_pice, price } = req.body;
  const { id } = req.params;

  try {
    const newData = {
      name: name,
      img: img,
      shipping: shipping_pice,
      price: price,
    };
    await Android.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json({ message: "update successfull" });
  } catch (error) {
    res.json(error);
  }
};

const deleteAndroid = async (req, res) => {
  try {
    const { id } = req.params;
    await Android.findOneAndDelete({ _id: id });
    res.json({ message: "deleted" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addAndroid: addAndroid,
  getAndroids: getAndroids,
  deleteAndroid: deleteAndroid,
  updateAndroid: updateAndroid,
  getAndroid: getAndroid,
};
