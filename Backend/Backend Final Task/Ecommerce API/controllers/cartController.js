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
      cart.products.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "products.productId",
      "name price"
    );

    res.status(200).json({ message: "Product added to cart", cart: updatedCart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId",
      "name price"
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
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(
      (p) => p._id.toString() === req.params.id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "products.productId",
      "name price"
    );

    res.json({ message: "Cart item updated", cart: updatedCart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item._id.toString() !== req.params.id
    );

    if (cart.products.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.json({ message: "Cart deleted because it is empty" });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "products.productId",
      "name price"
    );

    res.json({ message: "item removed from cart", cart: updatedCart });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};
