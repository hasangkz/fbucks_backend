const Bill = require('../models/Bill');

const express = require('express');

const router = express.Router();

//! get all Bill
router.get('/get-all', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
  }
});

//! create
router.post('/create-bill', async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json('Item added successfully.');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
