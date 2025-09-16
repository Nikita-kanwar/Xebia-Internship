const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'invalid Authorization header' });
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
