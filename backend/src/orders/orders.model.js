const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
