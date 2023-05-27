const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
