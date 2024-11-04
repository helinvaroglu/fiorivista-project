const express = require('express');
const router = express.Router();
const User = require('./user.model');

// API endpoints

// signup endpoint
router.post("/signup", async (req, res) => {
    try {
        const {fullName, email, password, confirmPassword} = req.body;
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

        res.status(200).send({message: "Logged in successfully!", user});
    
    } catch (error) {
        console.error("Error occurred while logging in.", error);
        res.status(500).send({message: "Error occurred while logging in."})
    }
})

module.exports = router;