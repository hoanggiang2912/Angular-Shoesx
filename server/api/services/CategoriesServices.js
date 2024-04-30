const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

exports.getAll = async () => {
  try {
    const categories = await CategoriesModel.find();

    // const categoriesWithProductAmounts = categories.map(category => ({
    //     ...category._doc,
    //     productAmount: category.products.length
    // }));

    // return categoriesWithProductAmounts;
    return categories;
  } catch (err) {
    console.error(err);
  }
};

exports.getOne = async (id) => {
  const category = await CategoriesModel.findById(id);
  return category;
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
