const express = require("express");
const router = express.Router();

const BillsModel = require("../models/BillsModel");
const BillsController = require("../controllers/BillsController");

const { json } = require("body-parser");
const verify = require("./verifyToken.js");
const ProductsModel = require("../models/ProductsModel.js");
const ProductsController = require("../controllers/ProductsController.js");

/** /api/v1/bills */

// get all bills
router.get("/", async (req, res, next) => {
  try {
    const bills = await BillsController.getAll();
    res.json(bills);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a specific bill
router.get("/:id", async (req, res, next) => {
  try {
    const bill = await BillsController.getById(req.params.id);
    res.json(bill);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const bills = await BillsController.getByUserId(req.params.id);
    res.json(bills);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res, next) => {
  const bill = new BillsModel({
    idUser: req.body.idUser,
    name: req.body.name,
    products: req.body.products,
    subTotal: req.body.subTotal,
    total: req.body.total,
    shippingMethod: req.body.shippingMethod,
    shippingFee: req.body.shippingFee,
    paymentMethod: req.body.paymentMethod,
    status: req.body.status,
    address: req.body.address,
    note: req.body.note,
    addressDetail: req.body.addressDetail,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    // update product qty
    // for (let i = 0; i < bill.products.length; i++) {
    //   const product = bill.products[i];
    //   const productId = product.idProduct;

    //   const productData = await ProductsController.getById(productId);
    //   console.log(productData);
    //   console.log(productData.products);

    //   if (productData.qty < product.qty) {
    //     return res.json({ message: "Product out of stock" });
    //   } else {
    //     const qty = productData.qty - product.qty;
    //     const updatedProduct = await ProductsController.updateQty(
    //       productId,
    //       qty
    //     );

    //     console.log(updatedProduct);
    //   }
    // }

    const savedBill = await bill.save();
    res.json(savedBill);
  } catch (error) {
    res.json({ message: error });
  }
});

// delete a specific bill
router.delete("/:id", async (req, res) => {
  console.log("Deleting bill with id:", req.params.id);
  try {
    const removedBill = await BillsModel.deleteOne({ _id: req.params.id });
    res.json(removedBill);
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.json({ message: error });
  }
});

// update a bill
router.patch("/:id", async (req, res, next) => {
  console.log("Updating bill with id:", req.params.id);
  try {
    const updatedBill = await BillsModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          total: req.body.total,
          shippingMethod: req.body.shippingMethod,
          shippingFee: req.body.shippingFee,
          paymentMethod: req.body.paymentMethod,
        },
      }
    );

    res.json({ updatedBill, success: true });
  } catch (error) {
    console.error("Error updating bill:", error);
    res.json({ errorMessage: error });
  }
});

// update bill status
router.patch("/update-status/:id", async (req, res) => {
  console.log("Updating bill status with id:", req.params.id);
  try {
    const updatedBill = await BillsModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          deliveryStatus: req.body.deliveryStatus,
          paymentStatus: req.body.paymentStatus,
        },
      }
    );

    res.json({ updatedBill, success: true });
  } catch (error) {
    console.error("Error updating bill status:", error);
    res.json({ errorMessage: "Error updating bill status" });
  }
});

router.patch("/cancel/:id", async (req, res) => {
  console.log("Cancelling bill with id:", req.params.id);

  try {
    const bill = await BillsModel.findById(req.params.id);

    if (bill.deliveryStatus === "pending") {
      const updatedBill = await BillsModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deliveryStatus: "canceled",
            paymentStatus: "canceled",
          },
        }
      );

      res.json({ updatedBill, success: true });
    } else {
      res.json({ errorMessage: "Can't cancel bill that is being processed" });
    }
  } catch (error) {
    console.error("Error cancelling bill:", error);
    res.json({ errorMessage: error });
  }
});

module.exports = router;
