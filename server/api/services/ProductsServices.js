const ProductsModel = require("../models/ProductsModel");
// const moment = require('moment');
// const date = moment().format('YYYY-MM-DD HH:mm:ss');

// exports.getAll = async (query) => {
//   // console.log(query);
//   let products = {};
//   const limit = 50;

//   if (query && Object.keys(query).length > 0) {
//     const { page, idCategory, keyword, viewed, limit } = query;
//     const skip = (page - 1) * limit;
//     const queries = {};

//     if (keyword) {
//       queries.title = {
//         $regex: new RegExp(keyword, "i"),
//       };
//     }

//     if (idCategory) {
//       queries.idCategory = idCategory;
//     }

//     if (viewed == true) {
//       products = await ProductsModel.find(queries)
//         .sort({ viewed: -1 })
//         .skip(skip)
//         .limit(limit)
//         .populate("idCategory", "_id name");
//     } else {
//       products = await ProductsModel.find(queries)
//         .skip(skip)
//         .limit(limit)
//         .populate("idCategory", "_id name");
//     }
//   } else {
//     products = await ProductsModel.find()
//       .limit(limit)
//       .populate("idCategory", "_id name");
//   }

//   return products;
// };
exports.getAll = async (query) => {
  let products = {};
  const limit = 50;
  let total = 0;
  let currentPage = 0;

  if (query && Object.keys(query).length > 0) {
    const { page, parent, children, keyword, viewed, limit, date } = query;
    currentPage = parseInt(page);
    const skip = (page - 1) * limit;
    const queries = {};

    if (keyword) {
      queries.title = {
        $regex: new RegExp(keyword, "i"),
      };
    }

    if (parent) {
      queries["idCategory.parent"] = parent;
    }

    if (children) {
      queries["idCategory.children"] = children;
    }

    if (parent && children) {
      queries["idCategory.parent"] = parent;
      queries["idCategory.children"] = children;
    }

    total = await ProductsModel.countDocuments(queries);

    if (viewed === "true") {
      products = await ProductsModel.find(queries)
        .sort({ viewed: -1 })
        .skip(skip)
        .limit(limit);
    } else if (date === "true") {
      products = await ProductsModel.find(queries)
        .sort({ creationDate: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      products = await ProductsModel.find(queries).skip(skip).limit(limit);
    }
  } else {
    products = await ProductsModel.find().limit(limit);
    total = await ProductsModel.countDocuments();
  }

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    perPage: limit,
    total,
    totalPages,
    page: currentPage,
  };
};
/**
 * 
const before = [
  [
    {
      _id: "662bc5fe08187327b5100236",
      idCategory: {
        parent: "Men",
        children: "Lifestyle",
      },
      size: [
        "EU 35.5",
        "EU 36",
        "EU 36.5",
        "EU 37.5",
        "EU 38",
        "EU 38.5",
        "EU 39",
        "EU 40",
        "EU 40.5",
        "EU 41",
        "EU 42",
      ],
      rating: 0,
      title: "Nike V2K Run",
      price: 3519000,
      qty: 100,
      salePrice: 0,
      background: "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      thumbnails: [
        "https://i.ibb.co/mT775QB/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/dKVyk9x/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/J7Hsd4W/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/DgsZHbC/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/W0rv1Wx/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/ysNn6Sr/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/yXzgQP7/v2k-run-shoes-z-JV8-TV.png",
        "https://i.ibb.co/Hx6DT9d/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      ],
    },
  ],
  [
    {
      _id: "662bc5fe08187327b5100236",
      idCategory: {
        parent: "Women",
        children: "Lifestyle",
      },
      size: [
        "EU 35.5",
        "EU 36",
        "EU 36.5",
        "EU 37.5",
        "EU 38",
        "EU 38.5",
        "EU 39",
        "EU 40",
        "EU 40.5",
        "EU 41",
        "EU 42",
      ],
      rating: 0,
      title: "Nike V2K Run",
      price: 3519000,
      qty: 100,
      salePrice: 0,
      background: "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      thumbnails: [
        "https://i.ibb.co/mT775QB/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/dKVyk9x/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/J7Hsd4W/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/DgsZHbC/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/W0rv1Wx/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/ysNn6Sr/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/yXzgQP7/v2k-run-shoes-z-JV8-TV.png",
        "https://i.ibb.co/Hx6DT9d/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      ],
    },
  ],
  [
    {
      _id: "662bc5fe08187327b5100236",
      idCategory: {
        parent: "Kids",
        children: "Lifestyle",
      },
      size: [
        "EU 35.5",
        "EU 36",
        "EU 36.5",
        "EU 37.5",
        "EU 38",
        "EU 38.5",
        "EU 39",
        "EU 40",
        "EU 40.5",
        "EU 41",
        "EU 42",
      ],
      rating: 0,
      title: "Nike V2K Run",
      price: 3519000,
      qty: 100,
      salePrice: 0,
      background: "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      thumbnails: [
        "https://i.ibb.co/mT775QB/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/dKVyk9x/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/J7Hsd4W/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/DgsZHbC/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/W0rv1Wx/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/ysNn6Sr/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/yXzgQP7/v2k-run-shoes-z-JV8-TV.png",
        "https://i.ibb.co/Hx6DT9d/v2k-run-shoes-z-JV8-TV.jpg",
        "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
      ],
    },
  ],
];

const sample = {
  Kids: [
    {
      _id: "662e1183cdf9f0588d87e057",
      idCategory: {
        parent: "Kids",
        children: "Lifestyle",
      },
      size: [
        "EU 32",
        "EU 33.5",
        "EU 34",
        "EU 35",
        "EU 35.5",
        "EU 36",
        "EU 36.5",
        "EU 37.5",
        "EU 38",
        "EU 38.5",
        "EU 39",
        "EU 40",
      ],
      rating: 0,
      title: "Nike Air Force 1 LV8 3",
      price: 2679000,
      qty: 100,
      salePrice: 0,
      background:
        "https://i.ibb.co/vCWPtHf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
      thumbnails: [
        "https://i.ibb.co/YDC2bs7/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/CQn2VMb/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/RYv6ZQc/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/F6vRHZK/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/sgw29sM/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/rw7pFGf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/YBdLTXR/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/2jc4xGz/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
        "https://i.ibb.co/vCWPtHf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
      ],
    },
  ],
  Men: [],
};
 */

function formatData(data) {
  let formattedData = {};

  data.forEach((item) => {
    let parentName = item[0].idCategory.parent;
    let productInfo = item;

    if (formattedData[parentName]) {
      formattedData[parentName].push(...productInfo);
    } else {
      formattedData[parentName] = productInfo;
    }
  });

  return formattedData;
}

/**
 * [
            {
                "_id": "662bc5fe08187327b5100236",
                "idCategory": {
                    "parent": "Men",
                    "children": "Lifestyle"
                },
                "size": [
                    "EU 35.5",
                    "EU 36",
                    "EU 36.5",
                    "EU 37.5",
                    "EU 38",
                    "EU 38.5",
                    "EU 39",
                    "EU 40",
                    "EU 40.5",
                    "EU 41",
                    "EU 42"
                ],
                "rating": 0,
                "title": "Nike V2K Run",
                "price": 3519000,
                "qty": 100,
                "salePrice": 0,
                "background": "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp",
                "thumbnails": [
                    "https://i.ibb.co/mT775QB/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/dKVyk9x/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/J7Hsd4W/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/DgsZHbC/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/W0rv1Wx/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/ysNn6Sr/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/yXzgQP7/v2k-run-shoes-z-JV8-TV.png",
                    "https://i.ibb.co/Hx6DT9d/v2k-run-shoes-z-JV8-TV.jpg",
                    "https://i.ibb.co/svvpgn5/v2k-run-shoes-z-JV8-TV.webp"
                ],
                "description": "Fast forward. Rewind. Doesn't matter—this shoe takes retro into the future. The V2K remasters everything you love about the Vomero in a look pulled straight from an early '00s running catalogue. Layer up in a mixture of flashy metallics, referential plastic details and a midsole with a perfectly vintage aesthetic. And the chunky heel makes sure wherever you go, it's in comfort.",
                "viewed": 0,
                "purchased": 0,
                "variants": [
                    {
                        "id": 1,
                        "qty": 100,
                        "background": "https: //i.ibb.co/4Wjd5Tp/v2k-run-shoes-z-JV8-TV.jpg",
                        "thumbnails": [
                            "https://i.ibb.co/4Wjd5Tp/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/Ct72QRj/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/bggX7PW/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/NjR2B3k/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/xSPbT4v/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/wpSv3Bm/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/4K0hKVX/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/QrvCWX1/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/n7zYN4w/v2k-run-shoes-z-JV8-TV.jpg"
                        ]
                    },
                    {
                        "id": 2,
                        "qty": 100,
                        "background": "https: //i.ibb.co/BLVDvwB/v2k-run-shoes-z-JV8-TV.jpg",
                        "thumbnails": [
                            "https://i.ibb.co/BLVDvwB/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/B2L3n3J/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/19LS8mZ/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/kDntD99/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/d7m5C2x/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/BCgxMgB/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/7rNkF4z/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/PrMDsth/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/GkLFFxM/v2k-run-shoes-z-JV8-TV.jpg"
                        ]
                    },
                    {
                        "id": 3,
                        "qty": 100,
                        "background": "https://i.ibb.co/zR4cyD4/v2k-run-shoes-z-JV8-TV.jpg",
                        "thumbnails": [
                            "https://i.ibb.co/zR4cyD4/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/7nyz2BW/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/37THKNM/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/60zGg3h/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/L8yF42p/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/Qp8RT1C/v2k-run-shoes-z-JV8-TV.jpg",
                            "https://i.ibb.co/C0DnQmW/v2k-run-shoes-z-JV8-TV.jpg"
                        ]
                    }
                ],
                "creationDate": "2024-04-26T15:19:26.620Z",
                "updateDate": "2024-04-26T15:19:26.620Z",
                "__v": 0
            }
        ],
        [
            {
                "_id": "662e04b5cdf9f0588d87e04d",
                "idCategory": {
                    "parent": "Women",
                    "children": "Lifestyle"
                },
                "size": [
                    "EU 35.5",
                    "EU 36",
                    "EU 36.5",
                    "EU 37.5",
                    "EU 38",
                    "EU 38.5",
                    "EU 39",
                    "EU 40",
                    "EU 40.5",
                    "EU 41",
                    "EU 42.5",
                    "EU 43",
                    "EU 44",
                    "EU 44.5"
                ],
                "rating": 0,
                "title": "Nike Air Max Dn",
                "price": 4409000,
                "qty": 100,
                "salePrice": 0,
                "background": "https://i.ibb.co/2k23Tdb/air-max-dn-shoes-dr-Xjb8.jpg",
                "thumbnails": [
                    "https://i.ibb.co/vYKV3nW/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/QMNS87S/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/DYztRVn/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/TTtY83B/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/XLXV6gK/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/k6YtqqP/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/YhH2XH5/air-max-dn-shoes-dr-Xjb8.jpg",
                    "https://i.ibb.co/2k23Tdb/air-max-dn-shoes-dr-Xjb8.jpg"
                ],
                "description": "Say hello to the next generation of Air technology. The Air Max Dn features our Dynamic Air unit system of dual-pressure tubes, creating a reactive sensation with every step. This results in a futuristic design that's comfortable enough to wear from day to night. Go ahead—Feel the Unreal.",
                "viewed": 0,
                "purchased": 0,
                "variants": [],
                "creationDate": "2024-04-28T08:11:33.591Z",
                "updateDate": "2024-04-28T08:11:33.591Z",
                "__v": 0
            }
        ],
        [
            {
                "_id": "662e1183cdf9f0588d87e057",
                "idCategory": {
                    "parent": "Kids",
                    "children": "Lifestyle"
                },
                "size": [
                    "EU 32",
                    "EU 33.5",
                    "EU 34",
                    "EU 35",
                    "EU 35.5",
                    "EU 36",
                    "EU 36.5",
                    "EU 37.5",
                    "EU 38",
                    "EU 38.5",
                    "EU 39",
                    "EU 40"
                ],
                "rating": 0,
                "title": "Nike Air Force 1 LV8 3",
                "price": 2679000,
                "qty": 100,
                "salePrice": 0,
                "background": "https://i.ibb.co/vCWPtHf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                "thumbnails": [
                    "https://i.ibb.co/YDC2bs7/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/CQn2VMb/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/RYv6ZQc/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/F6vRHZK/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/sgw29sM/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/rw7pFGf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/YBdLTXR/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/2jc4xGz/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg",
                    "https://i.ibb.co/vCWPtHf/air-force-1-lv8-3-older-shoes-Drs2-Ll.jpg"
                ],
                "description": "As cool today as when they first dropped more than 40 years ago, the AF-1 is a classic you can count on. Its durable construction, comfy Nike Air cushioning and grippy outsole will see you through day after day. And while they look great fresh out of the box, they remain cool even when scuffed. In fact, they might be even better.",
                "viewed": 0,
                "purchased": 0,
                "variants": [],
                "creationDate": "2024-04-28T09:06:11.139Z",
                "updateDate": "2024-04-28T09:06:11.139Z",
                "__v": 0
            }
        ]
 */

exports.getAllByMultiParent = async (parents, limit = 10) => {
  try {
    const categories = parents.split(",");
    const products = await Promise.all(
      categories.map(async (category) => {
        return await ProductsModel.find({
          "idCategory.parent": category,
        }).limit(limit);
      })
    );

    return {
      products: formatData(products),
    };
  } catch (error) {
    console.log("Error while getting products by multiple categories!");
  }
};

exports.getById = async (id) => {
  const product = await ProductsModel.findById(id);
  return { products: product, total: 1, page: 1, perPage: 1, totalPages: 1 };
};

exports.getByIdCategory = async ({ parent, children }) => {
  try {
    console.log(parent, children);
    const products = await ProductsModel.find({
      idCategory: {
        parent: parent,
        children: children,
      },
    });

    return {
      products,
      total: products.length,
      page: 1,
      perPage: products.length,
      totalPages: 1,
    };
  } catch (error) {
    console.log("Error while getting products by category!");
  }
};

exports.getRecentProducts = async (limit) => {
  const products = await ProductsModel.find().sort({ date: -1 }).limit(limit);
  return products;
};

exports.getProductsByViews = async (limit) => {
  const products = await ProductsModel.find().sort({ viewed: -1 }).limit(limit);
  return products;
};

exports.getProductsByName = async (name) => {
  const products = await ProductsModel.find({ title: name }).populate(
    "idCategory",
    "_id name"
  );
  return products;
};

exports.updateQty = async (productId, qty) => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        $set: {
          qty,
        },
      }
    );

    return updatedProduct;
  } catch (error) {
    return { message: error };
  }
};
