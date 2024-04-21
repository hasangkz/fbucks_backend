const Category = require('../models/Category');
const express = require('express');
const router = express.Router();

router.delete('/delete-category', async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json('Item has been deleted succesfully!');
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post('/add-category', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json('Item has been added succesfully!');
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put('/update-category', async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json('Item has been updated succesfully!');
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get('/get-all-categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get('/get-category/', async (req, res) => {
  try {
    const category = await Category.findOne(
      { _id: req.body.categoryId },
      req.body
    );
    res.status(200).send(category);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
