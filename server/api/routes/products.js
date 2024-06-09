const express = require("express");
const router = express.Router();
// const { createProductValidator } = require("../validation.js");
const ProductsModel = require("../models/ProductsModel");
const ProductsController = require("../controllers/ProductsController");
const { json } = require("body-parser");
const { verify } = require("./verifyToken.js");

// api/v1/products

// get all products
router.get("/", async (req, res, next) => {
  try {
    const queries = req.query;
    const data = await ProductsController.getAll(queries);
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/multi-category", async (req, res) => {
  try {
    const products = await ProductsController.getAllByMultiParent(
      req.query.parents,
      req.query.limit
    );
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get a specific product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsController.getById(req.params.id);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/category/:parent/:children", async (req, res, next) => {
  try {
    const idCategory = {
      parent: req.params.parent,
      children: req.params.children,
    };
    const product = await ProductsController.getByIdCategory(idCategory);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const product = await ProductsController.getProductsByName(name);
    return product;
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  // Validate
  // const { error } = createProductValidator(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  const product = new ProductsModel({
    idCategory: req.body.idCategory,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    salePrice: req.body.salePrice,
    background: req.body.background,
    thumbnails: req.body.thumbnails,
    size: req.body.size,
    qty: req.body.qty,
    variants: req.body.variants,
    status: req.body.status,
  });

  try {
    const savedProduct = await product.save();
    res.json({ savedProduct, success: true });
  } catch (error) {
    res.json({ message: error });
  }
});

// delete a specific product
router.delete("/:id", async (req, res) => {
  console.log("Deleting product with id:", req.params.id);
  try {
    const removedProduct = await ProductsModel.deleteOne({
      _id: req.params.id,
    });
    res.json({ removedProduct, success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.json({ message: error });
  }
});

// update a product
router.patch("/:id", async (req, res, next) => {
  console.log("Updating product with id:", req.params.id);
  try {
    const updatedProduct = await ProductsModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          salePrice: req.body.salePrice,
          description: req.body.description,
          qty: req.body.qty,
          idCategory: req.body.idCategory,
          background: req.body.background,
          thumbnails: req.body.thumbnails,
          size: req.body.size,
          variants: req.body.variants,
          status: req.body.status,
        },
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.json({ message: error });
  }
});

// update product views
router.patch("/:id/views", verify, async (req, res) => {
  console.log("Updating product views with id:", req.params.id);
  try {
    const updatedProduct = await ProductsModel.updateOne(
      { _id: req.params.id },
      {
        $inc: {
          viewed: req.body.viewed,
        },
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product views:", error);
    res.json({ message: error });
  }
});

router.patch("/return-qty/:id", async (req, res) => {
  console.log("Updating product qty with id:", req.params.id);

  try {
    const currentProduct = await ProductsModel.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newQty = currentProduct.qty + req.body.qty;

    const updatedProduct = await ProductsModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          qty: newQty,
        },
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.patch("/update-qty/:id", async (req, res) => {
  console.log("Updating product qty with id:", req.params.id);
  try {
    const currentProduct = await ProductsModel.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newQty = currentProduct.qty - req.body.qty;

    const updatedProduct = await ProductsModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          qty: newQty,
        },
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product qty:", error);
    res.json({ message: error });
  }
});

module.exports = router;
