const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order
router.put("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("The order can only be updated by the administrator!");
  }
});

// Delete order
router.delete("/:id", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("The order can only be deleted by the administrator!");
  }
});

// Get user order
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all orders
router.get("/", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(500)
      .json("Only the administrator can see the entire list of orders!");
  }
});

// Get monthly income
router.get("/income", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(500)
      .json(
        "Only the administrator can see the statistics related to the monthly income!"
      );
  }
});

// Get top sold products
router.get("/top-sold-products", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const topSoldProducts = await Order.aggregate([
        {
          $unwind: "$products",
        },
        {
          $group: {
            _id: "$products.productId",
            totalQuantity: { $sum: "$products.quantity" },
          },
        },
        {
          $sort: { totalQuantity: -1 },
        },
        {
          $limit: 10,
        },
      ]);
      // Extract the productIds from the result
      const productIds = topSoldProducts.map((product) => product._id);
      // Retrieve the details of the top sold products using the productIds
      const topSoldProductsDetails = await Product.find({
        _id: { $in: productIds },
      });
      // Combine the quantity and products
      const topSoldProductsData = topSoldProducts.map((product) => {
        const productDetails = topSoldProductsDetails.find(
          (details) => details._id.toString() === product._id.toString()
        );
        return {
          ...productDetails.toObject(),
          quantity: product.totalQuantity,
        };
      });
      res.json(topSoldProductsData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top sold products!" });
    }
  } else {
    res
      .status(500)
      .json(
        "Only the administrator can see the statistics related to the top sold products!"
      );
  }
});

// Get profit for this month
router.get("/profit", authentication.verify, async (req, res) => {
  if (req.user.role === "admin") {
    try {
      // Get the first and last day of the current month
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      // Calculation of total profit for the current month
      const result = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            status: "completed", // We only consider completed orders
          },
        },
        {
          $group: {
            _id: null,
            totalProfit: { $sum: "$amount" },
          },
        },
      ]);
      // Extract the total profit from the result
      const totalProfit = result.length > 0 ? result[0].totalProfit : 0;
      res.json(totalProfit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred!" });
    }
  } else {
    res
      .status(500)
      .json("Only the administrator can see the total profit for this month!");
  }
});

module.exports = router;
