const express = require("express");
const app = express();

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryProductRoute = require("./routes/categoryProduct");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

require("dotenv").config("./.env");
require("../api/db/mongoose");

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category-products", categoryProductRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});
