const express = require('express');
const router = express.Router();
const Order = require("./orders.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
        console.error("Error creating checkout:", error);
        res.status(500).send({message: "Failed to create checkout"});
    }
});

// confirm payment
router.post("/confirm-payment", async (req, res) => {
    const {session_id} = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"]
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({orderId: paymentIntentId});

        if(!order) {
            const lineItems = session.line_items.data.map((item) => ({

            }));

            const amount = session.amount_total / 100;
            order = new Order({
                orderId: paymentIntentId,
                amount,
                products: lineItems,
                email: session.customer_details.email,
                status: session.payment_intent.status === "succeed" ? "pending" : "failed"
            })
        } else {
            order.status = session.payment_intent.status === "succeed" ? "pending" : "failed";
        }
        await order.save();
        res.json({order});
        
    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).json({error: "Failed to confirm payment"});
    }
})

module.exports = router;