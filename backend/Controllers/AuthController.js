const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, please login',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error('Signup Error:', {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed: email or password is incorrect';

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPassEqual);  // Log password comparison result
        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            jwtSecret,
            { expiresIn: '24h' }
        );

        console.log('JWT Token:', jwtToken);  // Log JWT Token

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        console.error('Login Error:', {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    signup,
    login
};
