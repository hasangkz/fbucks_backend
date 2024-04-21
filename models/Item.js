const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: false },
    img: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('items', ItemSchema);
module.exports = Product;
