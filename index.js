const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const getAndroidRouter = require("./routes/androids.js");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/order");
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", getAndroidRouter);
app.use("/", userRouter);
app.use("/", orderRouter);
const localuri = "mongodb://localhost:27017/AndroidShop";

mongoose.connect(localuri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`server is runnit on ${PORT}`);
  });
});
