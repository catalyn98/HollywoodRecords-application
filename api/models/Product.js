const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true, lowercase: true },
    releaseYear: { type: Number, required: true },
    recordCompany: { type: String, required: true },
    length: { type: String, required: true, lowercase: true },
    availability: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    cover: { type: String, required: true },
    demo: { type: String, default: process.env.DEFAULT_DEMO },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
