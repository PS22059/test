// const ProductService = require('../services/ProductService')

// const createProduct = async (req, res) => {
//     try {
//         const { tenSanPham, donGia, mount, soLuongConLai, size, type, hinhAnh, rating, description, discount } = req.body
//         if (!tenSanPham || !donGia || !soLuongConLai || !size || !type || !rating || !description) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         }
//         const response = await ProductService.createProduct(req.body)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         const data = req.body
//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productId is required'
//             })
//         }
//         const response = await ProductService.updateProduct(productId, data)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const getDetailsProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productId is required'
//             })
//         }
//         const response = await ProductService.getDetailsProduct(productId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const deleteProduct = async (req, res) => {
//     try {
//         const productId = req.params.id
//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productId is required'
//             })
//         }
//         const response = await ProductService.deleteProduct(productId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const deleteMany = async (req, res) => {
//     try {
//         const ids = req.body.ids
//         if (!ids) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The ids is required'
//             })
//         }
//         const response = await ProductService.deleteManyProduct(ids)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const getAllProduct = async (req, res) => {
//     try {
//         const { limit, page, sort, filter } = req.query
//         const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const getAllType = async (req, res) => {
//     try {
//         const response = await ProductService.getAllType()
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// module.exports = {
//     createProduct,
//     updateProduct,
//     getDetailsProduct,
//     deleteProduct,
//     getAllProduct,
//     deleteMany,
//     getAllType
// }

// test
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
    console.log("RUn");
    // console.log(req.body);
  try {
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
    } = req.body;
    if (
      !name ||
      !image ||
      !type ||
      !countInStock ||
      !size ||
      !price ||
      !rating ||
      !discount
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllHomeProduct = async (req, res) => {
  try {
    const response = await ProductService.getAllHotProduct();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllProductByType = async (req, res) => {
  try {
    const { limit, page, sort, filter, type } = req.query;
    const response = await ProductService.getAllProductByType(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter,
      type
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByType,
  deleteMany,
  getAllType,
  getAllHomeProduct
};
