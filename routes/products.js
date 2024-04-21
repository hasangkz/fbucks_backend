const Product = require('../models/Item');

const express = require('express');

const router = express.Router();

//! get all Product
router.get('/get-all-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

//! create
router.post('/add-product', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json('Item added successfully.');
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update
router.put('/update-product', async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json('Item updated successfully.');
  } catch (error) {
    console.log(error);
  }
});

//! delete
router.delete('/delete-product', async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json('Item has been deleted succesfully!');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/get-category/', async (req, res) => {
  try {
    t65r;
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
