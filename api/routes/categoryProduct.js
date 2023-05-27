const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const CategoryProduct = require("../models/CategoryProduct");

// Create category product
router.post("/", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const newCategoryProduct = new CategoryProduct(req.body);
    try {
      const categoryProduct = await newCategoryProduct.save();
      res.status(200).json(categoryProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("You do not have the permision to add category product!");
  }
});

// Update category product
router.put("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const updateCategoryProduct = await CategoryProduct.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateCategoryProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(500)
      .json("You do not have the permision to update category product!");
  }
});

// Delete category product
router.delete("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      await CategoryProduct.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json(
          "The category product with id " + req.params.id + " has been deleted!"
        );
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("You do not have the permision to delete category product!");
  }
});

// Get all category product
router.get("/", async (req, res) => {
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (genreQuery) {
      list = await CategoryProduct.aggregate([
        { $sample: { size: 10 } },
        { $match: { genre: genreQuery } },
        { $sort: { createdAt: -1 } },
      ]);
    } else {
      list = await CategoryProduct.aggregate([
        { $sample: { size: 10 } },
        { $sort: { createdAt: -1 } },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one category product
router.get("/find/:id", async (req, res) => {
  try {
    const categoryProduct = await CategoryProduct.findById(req.params.id);
    res.status(200).json(categoryProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
