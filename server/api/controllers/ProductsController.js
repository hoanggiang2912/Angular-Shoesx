const ProductServices = require("../services/ProductsServices");

exports.getAll = async (query) => {
  const products = await ProductServices.getAll(query);
  return products;
};

exports.getAllByMultiParent = async (parents, limit) => {
  const products = await ProductServices.getAllByMultiParent(parents, limit);
  return products;
};

exports.getById = async (id) => {
  const product = await ProductServices.getById(id);
  return product;
};

exports.getByIdCategory = async (idCategory) => {
  const products = await ProductServices.getByIdCategory(idCategory);
  return products;
};

exports.getRecentProducts = async (limit) => {
  const products = await ProductServices.getRecentProducts(limit);
  return products;
};

exports.getProductsByViews = async (limit) => {
  const products = await ProductServices.getProductsByViews(limit);
  return products;
};
exports.getProductsByName = async (name) => {
  const products = await ProductServices.getProductsByName(name);
  return products;
};

exports.updateQty = async (id, qty) => {
  const product = await ProductServices.updateQty(id, qty);
  return product;
};
