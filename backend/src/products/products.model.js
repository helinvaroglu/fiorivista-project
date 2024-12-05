const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({
    name: {
        type: String, required: true
    },
    flowerType: {
        type: String, required: true
    },
    designType: {
        type: String, required: true
    },
    occasion: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    description: {
        type: String, required: true
    },
    image: String,
    rating: {
        type: String, default: 0
    }
})

const Products = mongoose.model("Product", ProductSchema);

module.exports = Products;