const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const blacklistTokenModel = require('../models/blacklist.model');


const RegisterUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body || {};
        const validUsername = typeof username === 'string' ? username.trim() : '';
        const validEmail = typeof email === 'string' ? email.trim() : '';
        const validPassword = typeof password === 'string' ? password : '';

        if (!validUsername || !validEmail || !validPassword) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const isUserALreadyExists = await userModel.findOne({
            $or: [{ username: validUsername }, { email: validEmail }]
        });

        if (isUserALreadyExists) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hash = await bcrypt.hash(validPassword, 10);

        const user = await userModel.create({
            username: validUsername,
            email: validEmail,
            password: hash
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

const LoginUserController = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const validEmail = typeof email === 'string' ? email.trim() : '';
        const validPassword = typeof password === 'string' ? password : '';

        if (!validEmail || !validPassword) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await userModel.findOne({ email: validEmail });

        if (!user) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(validPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Password is incorrect'
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

const LogOutUserController = async (req, res) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (token) {
            await blacklistTokenModel.create({
                token
            });
        }

        res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

        return res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

const getmeController = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User fetched successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = {
    RegisterUserController,
    LoginUserController,
    LogOutUserController,
    getmeController
}