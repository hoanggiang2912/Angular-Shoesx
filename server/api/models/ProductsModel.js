const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductsSchema = new mongoose.Schema({
  idCategory: {
    type: Object,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  background: {
    type: String,
    required: true,
  },
  thumbnails: Array,
  description: {
    type: String,
    required: true,
    default: "No description",
  },
  viewed: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
  variants: {
    type: Array,
    default: [],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "show",
  },
});

module.exports = mongoose.model("products", ProductsSchema);
