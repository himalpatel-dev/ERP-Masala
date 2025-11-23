const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
    try {
        // 1. Check if email already exists
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('Email is already in use.');
        }

        // 2. Hash the password (encryption)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // 3. Create the user in database
        const newUser = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            mobile: userData.mobile,
            role: userData.role
        });

        return newUser;
    } catch (error) {
        throw error;
    }
};

const Login = async (loginData) => {
    try {

        const { email, password } = loginData;

        // 1. Find user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const err = new Error('Invalid credentials.');
            err.status = 404;
            throw err;
        }

        // 2. Only admin can login
        if (user.role !== 'admin') {
            const err = new Error('Access denied. User is not an administrator.');
            err.status = 403;
            throw err;
        }

        // 3. Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const err = new Error('Invalid credentials.');
            err.status = 401;
            throw err;
        }

        // 4. Create JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return { user, token };

    } catch (error) {
        throw error;
    }
};


module.exports = {
    registerUser,
    Login
};