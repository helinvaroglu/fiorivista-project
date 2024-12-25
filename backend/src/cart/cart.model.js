const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  imageUrl: { type: String, required: true },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
