const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!JSON.parse(token)) {
        return res.status(403).json({ message: 'Access forbidden' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
};
