const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT in the request
 */
const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Verify JWT with the secret key
        req.user = decoded; // Attach decoded payload to the request object
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

/**
 * Middleware to check if the user is an admin
 */
const checkAdmin = (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = { verifyJWT, checkAdmin };