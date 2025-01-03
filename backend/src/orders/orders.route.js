const express = require("express");
const mongoose = require("mongoose");
const Order = require("./orders.model");
const crypto = require("crypto");

const router = express.Router();

// Add a new order
router.post("/addorder", async (req, res) => {
    try {
        const { 
            productId,
            productName,
            price,
            quantity,
            imageUrl,
        } = req.body;

        const order = new Order({ 
            _id: productId,
            productName,
            price,
            quantity,
            imageUrl,
            recipient: {
                fullName: "",
                phoneNumber: "",
                address: "",
                zipCode: "",
                city: "",
            },
            sender: {
                fullName: "",
                phoneNumber: "",
                emailAddress: ""
        }});
        await order.save();

        res.status(201).json({ orderId: order._id });
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

// Update the order with sender details
router.put("/updateSender/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const {
            senderFullName, 
            senderPhoneNumber, 
            senderEmailAddress,
        } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: {
                    sender: {
                        fullName: senderFullName,
                        phoneNumber: senderPhoneNumber,
                        emailAddress: senderEmailAddress,
                    },
                },
            },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ error: "Failed to update order" });
    }
});

// Update the order with recipient details
router.put("/updateRecipient/:orderId", async (req, res) => {
    try {
        const { orderId  } = req.params;
        const {
            recipientFullName,
            recipientPhoneNumber,
            recipientAddress,
            zipCode,
            cityName,
        } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: {
                    recipient: {
                        fullName: recipientFullName,
                        phoneNumber: recipientPhoneNumber,
                        address: recipientAddress,
                        zipCode,
                        city: cityName,
                    },
                },
            },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ error: "Failed to update order" });
    }
});


// Finalize order and add tracking key
router.post("/finalizeOrder/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (!order.trackingKey) {
            order.trackingKey = crypto.randomBytes(8).toString("hex"); // 16-char random hex key
            await order.save(); 
        }

        res.status(200).json(order); 
    } catch (err) {
        console.error("Error finalizing order:", err);
        res.status(500).json({ error: "Failed to finalize order" });
    }
});

// Track order by trackingKey
router.get("/track/:trackingKey", async (req, res) => {
    try {
        const { trackingKey } = req.params;

        const order = await Order.findOne({ trackingKey });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error("Error tracking order:", err);
        res.status(500).json({ error: "Failed to track order" });
    }
});

module.exports = router;
