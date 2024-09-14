//auth.js
/*const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;
*/

/*
//Auth.js
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is invalid or expired'
        });
    }
};

module.exports = ensureAuthenticated;
*/

const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {  // Add async here
    const token = req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);  // await can be used here because the function is async
  
      if (!user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Error with authentication:', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };


const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is invalid or expired'
        });
    }
};

module.exports = ensureAuthenticated;
