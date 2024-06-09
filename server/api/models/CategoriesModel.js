const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  children: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
  isGender: {
    type: Boolean,
    default: false,
  },
  updationDate: {
    type: Date,
    default: Date.now,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("categories", CategoriesSchema);
