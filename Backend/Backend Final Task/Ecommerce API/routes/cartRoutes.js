const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, removeCartItem);

module.exports = router;
