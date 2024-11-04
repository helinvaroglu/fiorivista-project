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

    }
})

module.exports = router;