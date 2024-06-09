const CategoriesServices = require("../services/CategoriesServices.js");

exports.getAll = async (query) => {
  const categories = CategoriesServices.getAll(query);
  return categories;
};

exports.getParentCategories = async () => {
  const categories = CategoriesServices.getParentCategories();
  return categories;
};

exports.getCategoriesWithProducts = async (query) => {
  const categories = CategoriesServices.getCategoriesWithProducts(query);
  return categories;
};

exports.getOne = async (id) => {
  const category = await CategoriesServices.getOne(id);
  return category;
};

exports.getChildrenCategories = async () => {
  try {
    const categories = await CategoriesServices.getChildrenCategories();
    return categories;
  } catch (error) {
    return { message: error.message };
  }
};

exports.getGenderCategories = async () => {
  try {
    const categories = await CategoriesServices.getGenderCategories();
    return categories;
  } catch (error) {
    return { message: error.message };
  }
};

exports.update = async (id, category) => {
  const updatedCategory = await CategoriesServices.update(id, category);
  return updatedCategory;
};

exports.create = async (category) => {
  const newCategory = await CategoriesServices.create(category);
  return newCategory;
};

exports.createNew = async () => {
  const newCategories = await CategoriesServices.createNew();
  return newCategories;
};
