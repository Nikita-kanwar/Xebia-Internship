const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        if (!name || price == null || stock == null) {
            return res.status(400).json({ message: 'name, price, and stock are required' });
        }

        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getProducts = async (_req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.json(prod);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated', product: prod });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const prod = await Product.findByIdAndDelete(req.params.id);
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
