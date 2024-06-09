const BillsModel = require("../models/BillsModel");
const ProductsModel = require("../models/ProductsModel");

exports.getAll = async () => {
  const bills = await BillsModel.find({}).sort({ date: -1 });
  return bills;
};

exports.getById = async (id) => {
  const bill = await BillsModel.findById(id);
  return bill;
};

exports.getByUserId = async (userId) => {
  const bills = await BillsModel.find({ idUser: userId }).sort({ date: -1 });
  return bills;
};

exports.create = async (bill) => {
  const newBill = await BillsModel.create(bill);
  return newBill;
};

exports.update = async (id, bill) => {
  const updatedBill = await BillsModel.findByIdAndUpdate(id, bill, {
    new: true,
  });
  return updatedBill;
};

exports.delete = async (id) => {
  const removedBill = await BillsModel.findByIdAndDelete(id);
  return removedBill;
};

exports.updateProductQty = async (productId, qty) => {
  const updatedProduct = await ProductsModel.updateOne(
    { _id: productId },
    { $set: { qty } }
  );
  return updatedProduct;
};
