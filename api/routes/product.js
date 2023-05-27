const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const Product = require("../models/Product");
const CategoryProduct = require("../models/CategoryProduct");

// Create product
router.post("/", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const newProduct = new Product(req.body);
    try {
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You do not have the permision to add products!");
  }
});

// Update product
router.put("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You do not have the permision to update products!");
  }
});

// Delete product
router.delete("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      await Product.findByIdAndDelete(req.params.id);
      await CategoryProduct.updateMany(
        { content: req.params.id },
        { $pull: { content: req.params.id } }
      );
      res.status(200).json("Product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You do not have the permision to delete products!");
  }
});

// Get all products
router.get("/", async (req, res) => {
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (genreQuery) {
      list = await Product.aggregate([
        { $match: { genre: genreQuery } },
        { $sort: { createdAt: -1 } },
      ]);
    } else {
      list = await Product.aggregate([{ $sort: { createdAt: -1 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get products statistics by genre
router.get("/statistics", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const data = await Product.aggregate([
        {
          $project: {
            Genre: { _id: "$genre" },
          },
        },
        {
          $group: {
            _id: "$Genre",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(500)
      .json(
        "Only the administrator can see the statistics related to the number of products by genre!"
      );
  }
});

// Get total number of products
router.get(
  "/total-number-of-products",
  authentication.verify,
  async (req, res) => {
    if (req.user.role === "admin") {
      try {
        const count = await Product.countDocuments({});
        res.json(count);
      } catch (error) {
        res.send(error);
      }
    } else {
      res
        .status(500)
        .json("Only the administrator can see the total number of products!");
    }
  }
);

module.exports = router;
