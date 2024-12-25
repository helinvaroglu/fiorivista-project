const express = require("express");
const mongoose = require("mongoose");
const Order = require("./orders.model");

const router = express.Router();

// Add a new order
router.post("/addorder", async (req, res) => {
    try {
        const { productName, price, quantity, imageUrl } = req.body;

        const order = new Order({ productName, price, quantity, imageUrl });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        console.error("Error adding order:", err);
        res.status(500).json({ error: "Failed to add order" });
    }
});

// Get all orders
router.get("/getorders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

module.exports = router;
