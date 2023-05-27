const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryProductSchema = Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true, lowercase: true },
    image: { type: String },
    content: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const CategoryProduct = mongoose.model(
  "CategoryProduct",
  CategoryProductSchema
);

module.exports = CategoryProduct;
