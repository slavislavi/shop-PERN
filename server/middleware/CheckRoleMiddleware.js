const jwt = require('jsonwebtoken');
// this middleware runs when you press "add device"
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!JSON.parse(token)) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: 'Not authorized' });
        }
    };
};
