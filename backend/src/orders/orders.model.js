const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    sender: { type: Object, default: {}},
    recipient: { type: Object, default: {}},
    trackingKey: { type: String, unique: true },
});

module.exports = mongoose.model("Order", OrderSchema);
