const express = require("express");
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController");

const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getUserOrders);

router.get("/all", authMiddleware, adminMiddleware, getAllOrders);

module.exports = router;
