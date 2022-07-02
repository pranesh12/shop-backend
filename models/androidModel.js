const mongoose = require("mongoose");
const { Schema } = mongoose;

const androidSchema = new Schema(
  {
    name: {
      type: String,
      require,
    },
    price: {
      type: Number,
      require,
    },

    img: {
      type: String,
      require,
    },

    shipping: {
      type: Number,
      require,
    },
  },
  {
    timestamps: true,
  }
);

const Android = mongoose.model("androids", androidSchema);

module.exports = Android;
