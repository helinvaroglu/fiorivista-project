const { parse } = require('dotenv');
const express = require('express');
const router = express.Router();
const Products = require('./products.model'); 

// get all products
router.get('/', async (req,res) => {
    try {
        const {flowerType, designType, occasion, price, page=1, limit=10, search} = req.query;
        let filter = {};
        if(flowerType && flowerType !== "all"){
            filter.flowerType = flowerType;
        }
        if(designType && designType !== "all"){
            filter.designType = designType;
        }
        if(occasion && occasion !== "all"){
            filter.occasion = occasion;
        }
        if(price) {
            if(!isNaN(price)){
                filter.price = price;
            }
        }
        
        if (search) {
            filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages =  Math.ceil(totalProducts/parseInt(limit));
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({createdAt: -1})
            .select("_id name flowerType designType occasion price description image rating");

        res.status(200).send({products, totalPages, totalProducts});

    } catch (error) {
        console.error("Error getting products.", error);
        res.status(500).send({ message: "Failed to get all products."});
    }  
})

// get single product
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId);

        if(!product) {
            return res.status(404).send({ message: "Product not found"});
        }

        res.status(200).send({product});
        
    } catch (error) {
        console.error("Error getting one product.", error);
        res.status(500).send({ message: "Failed to get the product."});
    }
})

module.exports = router;