const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1]  // get token from auth header
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded; // store for future use
            next();
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    } else {
        res.status(401).json({error: 'Access denied. No token provided'});
    }
}

module.exports = authMiddleware;