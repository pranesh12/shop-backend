const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    name: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    userId: {
      type: String,
    },
    orders: [],
    shippingAddress: {
      type: Object,
    },
    orderAmount: {
      type: Number,
      require,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
