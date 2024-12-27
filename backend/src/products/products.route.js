const { parse } = require('dotenv');
const express = require('express');
const router = express.Router();
const Products = require('./products.model'); 

// get all products
router.get('/', async (req,res) => {
    try {
        const {flowerType, designType, occasion, sort, page=1, limit=10, search} = req.query;
        let filter = {};
        if(flowerType && flowerType !== "all"){
            filter.flowerType = { $regex: `^${flowerType}$`, $options: 'i' };
        }
        if(designType && designType !== "all"){
            filter.designType = { $regex: `^${designType}$`, $options: 'i' };
        }
        if(occasion){
            filter.occasion = { $regex: `^${occasion}$`, $options: 'i' };
        }
        
        if (search) {
            filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        let sortOption = {};
        if (sort === 'priceAsc') {
        sortOption.price = 1;
        } else if (sort === 'priceDesc') {
        sortOption.price = -1;
        } else if (sort === 'ratingDesc') {
        sortOption.rating = -1;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages =  Math.ceil(totalProducts/parseInt(limit));
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({createdAt: -1})
            .select("_id name flowerType designType occasion price description image rating")
            .sort(sortOption);

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