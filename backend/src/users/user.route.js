const express = require('express');
const router = express.Router();
const User = require('./user.model');
const generateToken = require('../middleware/token');

// API endpoints

// signup endpoint
router.post("/signup", async (req, res) => {
    try {
        const {fullName, email, password, confirmPassword} = req.body;

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).send({ message: "All fields are required." });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "Email already exists." });
        }
        
        const user = new User({fullName, email, password, confirmPassword});
        await user.save();
        res.status(201).send({message: "Signed up successfully!"})
    } catch (error) {
        console.error("Error occurred while signing up.", error);
        res.status(500).send({message: "Error occurred while signing up."})
    }
})

// login endpoint
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({message: 'This user is not signed up.'})
        }
        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).send({message: 'Wrong password!'})
        }

        // generating token for keeping users info after logging in
        const token = await generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).send({message: "Logged in successfully!", token, user: {
            _id: user._id,
            fullName: user.fullName,
            password: user.password,
            confirmPassword: user.confirmPassword,
            role: user.role,
            phoneNumber: user.phoneNumber
        }});
    
    } catch (error) {
        console.error("Error occurred while logging in.", error);
        res.status(500).send({message: "Error occurred while logging in."})
    }
})

// logout endpoint
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).send({message: 'Logged out'})
})

module.exports = router;