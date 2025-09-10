const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [] });
    }

    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(
      (p) => p._id.toString() === req.params.id
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    res.json({ message: "Cart item updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p._id.toString() !== req.params.id
    );

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
