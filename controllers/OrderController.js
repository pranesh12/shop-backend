require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LFFU0IzfmS7pHpEZBQH5CRKrMCran9goN7ssdUenCChbNL51KN0MXrpD0IU6P3zLLnZdeq7d0itywEyyT8awtff00042YP5El"
);
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");
const userModel = require("../models/userModel");

const payment = async (req, res) => {
  const { totalAmount, token, currentUser, cartItems } = req.body;
  const idempotencyKey = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        currency: "usd",
        receipt_email: token.email,
        customer: customer.id,
      },
      { idempotencyKey }
    );

    if (charge) {
      Order.create({
        name: currentUser.name,
        email: token.email,
        orderAmount: totalAmount,
        orders: cartItems,
        userId: currentUser._id,
        shippingAddress: {
          city: token.card.address_country,
          streetAddress: token.card.address_line1,
        },
      });
      console.log("succefull");
      res.send({ message: "Payment successfull" });
    } else {
      console.log("unsuceefull");
      res.send({ message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Payment Failed" });
  }
};

const allOrder = async (req, res) => {
  const { email } = req.query;
  try {
    const admin = await userModel.find({ email: email });
    if ((admin.isAdmin = true)) {
      const orderList = await Order.find({});
      res.status(200).json(orderList);
    } else {
      res.status(400).json("Something wrong");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const userOrder = async (req, res) => {
  const { email } = req.query;
  try {
    const userOrderList = await Order.find({ email: email });
    res.status(200).json(userOrderList);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  userOrder: userOrder,
  payment: payment,
  allOrder: allOrder,
};
