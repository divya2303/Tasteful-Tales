const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        // Ensure data is in the correct format before inserting
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Check if the user already exists
        let eId = await Orders.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            // Create a new order record for the new user
            try {
                await Orders.create({
                    email: req.body.email,
                    order_data: [data]
                });
                return res.json({ success: true });
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        } else {
            // Update the existing user's order data
            try {
                await Orders.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                return res.json({ success: true });
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error: " + error.message);
    }
})
router.post('/myorderData',async (req,res)=>{
    try {
        let myData = await Orders.findOne({'email':req.body.email})
        res.json({orderData: myData})
    } catch (error) {
        return res.status(500).send("Server Error: " + error.message);    }
})

module.exports = router;
