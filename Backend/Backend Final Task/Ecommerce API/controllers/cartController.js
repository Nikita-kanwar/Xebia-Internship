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
      await Cart.updateOne(
        { _id: cart._id, "products.productId": productId },
        { $inc: { "products.$.quantity": quantity || 1 } }
      );
    } else {
      await Cart.updateOne(
        { _id: cart._id },
        { $push: { products: { productId, quantity } } }
      );
    }

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

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "products._id": req.params.id },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate("products.productId", "name price");

    if (!cart) return res.status(404).json({ message: "Item or cart not found" });

    res.json({ message: "Cart item updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { products: { _id: req.params.id } } },
      { new: true }
    ).populate("products.productId", "name price");

    if (!cart) return res.status(404).json({ message: "Cart or item not found" });

    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
