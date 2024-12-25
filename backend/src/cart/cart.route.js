const express = require('express');
const mongoose = require('mongoose');
const CartItem = require('./cart.model');

const router = express.Router();

// Add item to cart
router.post('/addorder', async (req, res) => {
  try {
    const { productName, price, quantity, imageUrl } = req.body;

    // Validate request body
    if (!productName || !price || !quantity || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const cartItem = new CartItem({ productName, price, quantity, imageUrl });
    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get all items in the cart
router.get('/getitems', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Remove an item from the cart
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
