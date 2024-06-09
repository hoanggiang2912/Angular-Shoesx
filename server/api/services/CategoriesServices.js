const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

exports.getAll = async (query) => {
  let categories;

  if (query && Object.keys(query).length > 0) {
    const { product, parent } = query;

    if (product === "true") {
      try {
        if (parent === "true") {
          categories = await CategoriesModel.find({
            children: { $ne: [] },
          }).sort({ creationDate: -1 });
        } else {
          categories = await CategoriesModel.find().sort({ creationDate: -1 });
        }
        const categoriesWithProducts = await Promise.all(
          categories.map(async (category) => {
            const products = await ProductsModel.find({
              "idCategory.parent": category.categoryId,
            });
            return {
              ...category._doc,
              products,
            };
          })
        );
        return categoriesWithProducts;
      } catch (err) {
        return { message: err.message };
      }
    }
  }

  try {
    categories = await CategoriesModel.find();
    return categories;
  } catch (err) {
    console.error(err);
  }
};

exports.getParentCategories = async () => {
  const categories = await CategoriesModel.find({
    children: { $ne: [] },
  });

  return categories;
};

exports.getCategoriesWithProducts = async (query) => {
  let categories;
  let queries;

  if (Object.keys(query).length > 0) {
    const { product } = query;

    if (product) {
    }
  }

  try {
    const categories = await CategoriesModel.find();
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await ProductsModel.find({
          categoryId: category.categoryId,
        });
        return {
          category,
          products,
        };
      })
    );
    return categoriesWithProducts;
  } catch (err) {
    console.error(err);
  }
};

exports.getChildrenCategories = async () => {
  const categories = await CategoriesModel.find({
    children: { $size: 0 },
  });

  return categories;
};

exports.getGenderCategories = async () => {
  const categories = await CategoriesModel.find({
    isGender: true,
  });

  return categories;
};

exports.getOne = async (id) => {
  let category = await CategoriesModel.findById(id);

  const products = await ProductsModel.find({
    "idCategory.parent": category.categoryId,
  });

  return {
    ...category._doc,
    products,
  };
};

exports.update = async (id, category) => {
  const updatedCategory = await CategoriesModel.updateOne(
    { categoryId: id },
    {
      $set: {
        name: category.name,
        description: category.description,
      },
    }
  );
  return updatedCategory;
};

exports.create = async (category) => {
  const newCategory = new CategoriesModel({
    name: category.name,
    description: category.description,
  });

  try {
    const saveCategory = await newCategory.save();
    return saveCategory;
  } catch (error) {
    console.error("Error creating category:", error);
    return { message: error };
  }
};

exports.createNew = async () => {
  const newCategories = await CategoriesModel.insertMany([
    { categoryId: "Lifestyle", name: "Lifestyle", children: [] },
    { categoryId: "Jordan", name: "Jordan", children: [] },
    { categoryId: "Running", name: "Running", children: [] },
    { categoryId: "Basketball", name: "Basketball", children: [] },
    { categoryId: "Football", name: "Football", children: [] },
    { categoryId: "Training & Gym", name: "Training & Gym", children: [] },
    { categoryId: "Skateboarding", name: "Skateboarding", children: [] },
    { categoryId: "Golf", name: "Golf", children: [] },
    { categoryId: "Tennis", name: "Tennis", children: [] },
    { categoryId: "Athletics", name: "Athletics", children: [] },
    { categoryId: "Walking", name: "Walking", children: [] },
    { categoryId: "Boy's shoes", name: "Boy's shoes", children: [] },
    { categoryId: "Girl's shoes", name: "Girl's shoes", children: [] },
    {
      categoryId: "Kids",
      name: "Kids",
      children: ["Boy's shoes", "Girl's shoes"],
    },
    {
      categoryId: "Men",
      name: "Men",
      children: [
        "Lifestyle",
        "Jordan",
        "Running",
        "Basketball",
        "Football",
        "Training & Gym",
        "Skateboarding",
        "Golf",
        "Tennis",
        "Athletics",
        "Walking",
      ],
    },
    {
      categoryId: "Woman",
      name: "Woman",
      children: [
        "Lifestyle",
        "Jordan",
        "Running",
        "Basketball",
        "Football",
        "Training & Gym",
        "Skateboarding",
        "Golf",
        "Tennis",
        "Athletics",
        "Walking",
      ],
    },
  ]);

  try {
    const saveCategories = await newCategories.save();
    return saveCategories;
  } catch (error) {
    console.error("Error creating category:", error);
    return { message: error };
  }
};

exports.delete = async (id) => {
  const deletedCategory = await CategoriesModel.deleteOne({ categoryId: id });
  return deletedCategory;
};
