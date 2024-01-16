const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SEC);
            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(403).json('Invalid token');
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json('Invalid token');
        }
    } else {
        return res.status(401).json('You are not authenticated');
    }
};

module.exports = { verifyToken };
