const productSchema = require("../Models/products.model");

exports.createProduct = async (req, res) => {
  try {
    console.log("create is called");
    const { createdBy, name, description, price, address, category, image } =
      req.body;
    // const validCategories = ['cows', 'sheeps', 'goat', 'donkey', 'horse'];

    // if (!category || !validCategories.includes(category.toLowerCase())) {
    //     return res.status(400).json({ error: 'Invalid category' });
    // }

    const newProduct = new productSchema({
      createdBy: req.user.userId,
      name,
      description,
      price,
      address,
      category,
      image,
    });

    const savedProduct = await newProduct.save();
    const populatedProduct = await productSchema
      .findById(savedProduct._id)
      .populate("createdBy")
      .exec();

    res.status(201).json({
      success: true,
      message: "Product is added successfully!",
      data: populatedProduct,
    });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Error saving product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query.category);
    let allProducts = [];
    if (req.query.category) {
      allProducts = await productSchema.find({ category: req.query.category });
    }else{
        allProducts = await productSchema.find();
    }
    if (!allProducts) {
      return res.status(404).json({
        success: false,
        mesesege: "Unable to fetch products",
      });
    }
    return res.status(200).json({
      success: true,
      messege: "Products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({
      message: "Error fetching product",
    });
  }
};

//get single product
exports.getSinleProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const product = await productSchema.findById(prodId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `product with this ${prodId} not found` });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Udate product details

exports.updateProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const productDetails = req.body;
    const updatedProduct = await productSchema.findByIdAndUpdate(
      prodId,
      productDetails
    );
    if (!updatedProduct) {
      return res.status(401).json({
        message: "product not found",
      });
    }
    return res.status(201).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Remove product by id

exports.removeSingleProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const removedProd = await productSchema.findByIdAndRemove(prodId);
    if (!removedProd) {
      return res.status(401).json({
        message: "product not found",
      });
    }
    res.status(200).json({
      message: "Deleted Successfully!",
      removedProd,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Remove all products
exports.removeProducts = async (req, res) => {
  try {
    const removedProducts = await productSchema.deleteMany();
    if (!removedProducts) {
      return res.status(401).json({
        message: "product not found",
      });
    }
    res.status(201).json({
      message: "products deleted",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ****************Farmer's controllers ****************** //

// Get products from Farmer

exports.getAllProductsOfFarmer = async (req, res) => {
  try {
    // console.log(req.user)
    const farmer_id = req.user.userId;
    const farmerProducts = await productSchema.find({ createdBy: farmer_id });

    res.status(200).json({
      success: true,
      message: "Farmer's products fetched successfully",
      data: farmerProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
