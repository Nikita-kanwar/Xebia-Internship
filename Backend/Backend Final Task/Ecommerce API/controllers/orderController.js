const Order = require("../models/order");
const Cart = require("../models/cart");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("products.productId", "name price");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.products.reduce((sum, item) => {
      if (!item.productId) return sum; 
      return sum + item.productId.price * item.quantity;
    }, 0);

    const orderProducts = cart.products
      .filter(p => p.productId) 
      .map(p => ({
        productId: p.productId._id,
        quantity: p.quantity,
      }));

    const order = await Order.create({
      userId,
      products: orderProducts,
      totalPrice,
      status: "pending",
    });

    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("products.productId", "name price");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
