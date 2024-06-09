var express = require("express");
var router = express.Router();
const CategoiesController = require("../controllers/CategoriesController");
const CategoriesModel = require("../models/CategoriesModel");
const { json } = require("body-parser");
const { verify } = require("./verifyToken.js");

// api/v1/categories

// get all categories
router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    const categories = await CategoiesController.getAll(query);
    res.json(categories);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/category/:idCategory", async (req, res, next) => {
  try {
    const id = req.params.idCategory;
    const category = await CategoiesController.getOne(id);
    res.json(category);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/parent", async (req, res, next) => {
  try {
    const categories = await CategoiesController.getParentCategories();
    res.json(categories);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const query = req.query;
    const categories = await CategoiesController.getCategoriesWithProducts(
      query
    );
    res.json(categories);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/children", async (req, res, next) => {
  try {
    const categories = await CategoiesController.getChildrenCategories();
    res.json(categories);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/gender", async (req, res) => {
  try {
    const categories = await CategoiesController.getGenderCategories();
    res.json(categories);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// submit a category
router.post("/", async (req, res, next) => {
  const category = new CategoriesModel({
    name: req.body.name,
    categoryId: req.body.name,
  });

  try {
    const saveCateogory = await category.save();
    res.json({ saveCateogory, success: true });
  } catch (error) {
    res.json({ message: error });
  }
});

// post categories manually
router.post("/manual", async (req, res, next) => {
  const categories = await CategoiesController.createNew();
  res.json(categories);
});

// get a specific category
router.get("/:id", async (req, res, next) => {
  try {
    const category = await CategoriesModel.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.json({ message: error });
  }
});

// delete a specific category
router.delete("/:id", async (req, res) => {
  console.log("Deleting category with id:", req.params.id);
  try {
    const removedCategory = await CategoriesModel.deleteOne({
      _id: req.params.id,
    });
    res.json(removedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.json({ message: error });
  }
});

// update a category
router.patch("/:id", async (req, res, next) => {
  console.log("Updating category with id:", req.params.id);
  try {
    const updatedCategory = await CategoriesModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          categoryId: req.body.name,
        },
      }
    );

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.json({ message: error });
  }
});

module.exports = router;
