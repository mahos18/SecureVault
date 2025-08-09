const e = require('express');
const jwt = require('jsonwebtoken');
const checkAuth= (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access', success: false });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token', success: false });
        }
        req.user = decoded; // Attach user info to request object
        next();
    });
}
module.exports = checkAuth;