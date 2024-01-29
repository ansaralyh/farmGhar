const productSchema = require('../Models/products.model');

exports.createProduct = async (req, res) => {
    try {
        const { createdBy, name, description, price, place, category,isSold } = req.body;
        const validCategories = ['cows', 'sheeps', 'goat', 'donkey', 'horse'];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const newProduct = new productSchema({
            createdBy: req.user.userId,
            name,
            description,
            price,
            place,
            category,
            isSold,
            image: req.file ? req.file.buffer : undefined,
        });
        // console.log("req",req)
        console.log('Request Body:', req.body);
        console.log("req.file :", req.file)

        const savedProduct = await newProduct.save();
        const populatedProduct = await productSchema.findById(savedProduct._id).populate('createdBy').exec();

        res.status(201).json({
            success: true,
            message: 'Product is added successfully!',
            data: populatedProduct,
        });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(500).json({ message: 'Error saving product' });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await productSchema.find();
        if (!allProducts) {
            return res.status(404).json({
                success: false,
                mesesege: "Unable to fetch products"
            })
        }
        return res.status(200).json({
            success: true,
            messege: "Products fetched successfully",
            data: allProducts
        })
    }
    catch (error) {

        console.error("Save Error:", error);
        res.status(500).json({
            message: "Error fetching product",

        });
    }
}

//get single product
exports.getSinleProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        const product = await productSchema.findById(prodId);
        if (!product) {
            return res.status(404).json({ message: `product with this ${prodId} not found` });
        }
        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Udate product details

exports.updateProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        const productDetails = req.body;
        const updatedProduct = await productSchema.findByIdAndUpdate(prodId, productDetails);
        if (!updatedProduct) {
            return res.status(401).json({
                message: "product not found"
            })
        }
        return res.status(201).json({
            success: true,
            updatedProduct
        })


    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


// Remove product by id

exports.removeSingleProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        const removedProd = await productSchema.findByIdAndRemove(prodId);
        if (!removedProd) {
            return res.status(401).json({
                message: "product not found"
            })
        }
        res.status(200).json({

            message: "Deleted Successfully!",
            removedProd
        })
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Remove all products
exports.removeProducts = async (req, res) => {
    try {
        const removedUser = await productSchema.deleteMany();
        res.status(201).json({
            message: 'products deleted',
        })
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}