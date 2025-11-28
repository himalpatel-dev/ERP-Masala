// controllers/authController.js

const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        // Call the service
        const user = await authService.registerUser(req.body);

        // Return success response
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const Login = async (req, res) => {
    try {

        const { user, token } = await authService.Login(req.body);


        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        const status = error.status || 400;
        res.status(status).json({ message: error.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await authService.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    register,
    Login,
    getAllUser
};