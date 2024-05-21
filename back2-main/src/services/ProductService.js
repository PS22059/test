const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const  mongoose = require("mongoose");
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      countInStock,
      size,
      price,
      rating,
      description,
      discount,
    } = newProduct;
    try {
      // const checkProduct = await Product.findOne({
      //     rating: rating
      // })
      // if (checkProduct !== '5') {
      //     resolve({
      //         status: 'ERR',
      //         message: 'Rating phải là 5'
      //     })
      // }
      console.log({
        name,
        type,
        countInStock: Number(countInStock),
        size: Number(size),
        price: Number(price),
        rating: Number(rating),
        description,
        discount: Number(discount),
      });

      const newProduct = await Product.create({
        name,
        image,
        type,
        countInStock: Number(countInStock),
        size: Number(size),
        price: Number(price),
        rating: Number(rating),
        description,
        discount: Number(discount),
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllHotProduct = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "type",
            foreignField: "_id",
            as: "productType",
          },
        },
        {
          $unwind: "$productType",
        },
        {
          $group: {
            _id: "$productType._id", // Sử dụng _id của category
            typeName: { $first: "$productType.ten" },
            products: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            type: {
              _id: "$_id",
              name: "$typeName",
            },
            products: { $slice: ["$products", 4] },
          },
        },
      ]);
      if (results) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: results,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // lấy ra tên danh mục trong đối tượng type
      const product = await Product.findOne({
        _id: id,
      }).populate("type", "ten");
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      let allProduct = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .populate("type")
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .populate("type")
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (!limit) {
        allProduct = await Product.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allProduct = await Product.find()
          .populate("type")
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductByType = async (limit, page, sort, filter, type) => {
  const category = await Category.findOne({ ten: type });
  try {
    let query = {};
    if (filter) {
      const label = filter[0];
      query[label] = { $regex: filter[1] };
    }
    if (type && category) {
      query.type = category?._id;
    }

    const objectSort = {};
    if (sort) {
      objectSort[sort[1]] = sort[0];
    }
    const totalProduct = await Product.count(query);
    let allProduct = [];
    if (!limit) {
      allProduct = await Product.find(query).sort({
        createdAt: -1,
        updatedAt: -1,
      });
    } else {
      allProduct = await Product.find(query)
        .populate("type")
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: -1, updatedAt: -1, ...objectSort });
    }

    // Trả về kết quả
    return {
      status: "OK",
      message: "Success",
      data: allProduct,
      total: totalProduct,
      pageCurrent: Number(page + 1),
      totalPage: Math.ceil(totalProduct / limit),
    };
  } catch (e) {
    throw e;
  }
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Category.find();
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByType,
  deleteManyProduct,
  getAllType,
  getAllHotProduct,
};
