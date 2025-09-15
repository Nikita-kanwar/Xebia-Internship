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

exports.getProducts = async (req, res) => {
    try {
        let { search, category, sort, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let filter = {};
        if (search) {
            filter.name = { $regex: search, $options: "i" }; 
        }
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        let sortOption = {};
        if (sort) {
            const sortFields = sort.split(','); 
            sortFields.forEach(field => {
                const order = field.startsWith('-') ? -1 : 1;
                const key = field.replace('-', '');
                sortOption[key] = order;
            });
        } else {
            sortOption = { createdAt: -1 }; 
        }

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(filter);

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            products
        });
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
