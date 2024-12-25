const express = require('express');
const router = express.Router();

// checkout session
router.post("/create-checkout-session", async (req, res) => {
    const {products} = req.body;

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "tl",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                amount: product.price
            }
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `$http://localhost:3000/canceled`,
        })

        res.json({id: session.id})

    } catch (error) {
        console.error("Error creating checkout", error);
        res.status(500).send({message: "Failed to create checkout"});
    }
})

module.exports = router;