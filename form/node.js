// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// App and Middleware
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
});

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, default: Date.now, expires: 300 },
});

const User = mongoose.model('User', userSchema);
const OTP = mongoose.model('OTP', otpSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, mobile, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
        res.status(400).json({ error: 'Error during signup', details: err });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secretKey');
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: 'Error during login', details: err });
    }
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtp = new OTP({ email, otp });
        await newOtp.save();

        // Send OTP via email (configure nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: 'your-email@gmail.com', pass: 'your-password' },
        });

        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(400).json({ error: 'Error during password reset', details: err });
    }
});

// Reset Password Route
app.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const validOtp = await OTP.findOne({ email, otp });
        if (!validOtp) return res.status(400).json({ error: 'Invalid OTP' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });
        await OTP.deleteOne({ email, otp });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ error: 'Error during password reset', details: err });
    }
});

// Update Profile Route
app.post('/update-profile', async (req, res) => {
    try {
        const { email, updates } = req.body;
        await User.updateOne({ email }, updates);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error during profile update', details: err });
    }
});

// Sign Out Route
app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Sign out successful' });
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
