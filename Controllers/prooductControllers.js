const productSchema = require('../Models/products.model');
const userSchema = require('../Models/user.model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, place, category } = req.body;
        const validCategories = ['cows', 'sheeps', 'goat', 'donkey', 'horse'];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const newProduct = new productSchema({
            createdBy: req.user._id,
            name,
            description,
            price,
            place,
            category,
        });
        console.log(newProduct)

        const savedProduct = await newProduct.save();

       
        const populatedProduct = await productSchema.findById(savedProduct._id).populate('createdBy').exec();

        res.status(201).json({
            success: true,
            message: 'Product is added successfully!',
            data: populatedProduct,
        });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({
            message: "Error saving product",
        });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await productSchema.find();
        // console.log(allProducts)
        if (!allProducts) {
            return res.status(404).json({
                success: false,
                mesesege: "Unable to fetch products"
            })
        }
        return res.status(200).json({
            success:true,
            messege:"Products fetched successfully",
            data:allProducts
        })
    } 
    catch (error){

 console.error("Save Error:", error);
        res.status(500).json({
            message: "Error fetching product",

        });
    }
}