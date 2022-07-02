const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sekretKey = "bla";

const siginIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await userModel.findOne({ email: email });
    if (!oldUser) res.status(404).json({ meassage: "user Does not exsist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      res.status(404).meassage({ meassage: "password don't match" });
    } else {
      const token = jwt.sign({ email: oldUser.email, _id: oldUser._id }, sekretKey, {
        expiresIn: "1h",
      });
      const result = {
        name: oldUser.name,
        email: oldUser.email,
        _id: oldUser._id,
        isAdmin: oldUser.isAdmin,
      };
      res.status(200).json({ token, result });
    }
  } catch (error) {
    res.json(error);
  }
};

//Register Route
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const oldUser = await userModel.findOne({ email: email });
    if (!oldUser) {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUesr = await userModel.create({
        name,
        email,
        password: hashPassword,
      });
      const result = await {
        name: newUesr.name,
        email: newUesr.email,
        isAdmin: newUesr.isAdmin,
        _id: newUesr._id,
      };
      const token = await jwt.sign(
        { email: newUesr.email, _id: newUesr._id },
        sekretKey,
        { expiresIn: "1h" }
      );
      res.status(201).json({ result, token });
    } else {
      res.status(400).json({ meassage: "some Thig went wrong" });
    }
  } catch (error) {
    res.json(error);
  }
};

//Admin get All customer data
const customers = async (req, res) => {
  try {
    const { email } = req.query;
    const Admin = await userModel.find({ email: email, isAdmin: true });
    if (Admin.length) {
      const AllCustomers = await userModel.find({});
      const customers = {
        name: AllCustomers.name,
        email: AllCustomers.email,
      };

      res.status(200).json(AllCustomers);
    } else {
      res.json({ meassage: "something went wrong" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  siginIn: siginIn,
  register: register,
  customers: customers,
};
