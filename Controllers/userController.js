const userSchema = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')
const SECRET = '12345';



exports.register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const user = await userSchema.findOne({ email: email });

        if (user) {
            return res.status(500).json({
                success: false,
                messege: 'Duplicate email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userSchema.create({
            name, email, password: hashedPassword, role

        });
        return res.status(200).json({

            success: true,
            data: newUser
        })
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({
            message: "Error saving user"
        });
    }
}
// login function

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                messege: `User not found wiwth this ${email}`
            })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({
                message: "Password does not match"
            });
        }
        const token = jsonwebtoken.sign({ userEmail: user.email,SECRET , userRole:user.role }, SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "User logged in successfully!",
            token,
            user
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get all users

exports.getAllUsers = async(req,res)=>{
    try {
        const users = await userSchema.find();
        if(!users){
            return res.status(404).json({
                success:false,
                messege:"Users not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Users found successfully",
            data:users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}



// GetSingleUser
exports.getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const singleUser = await userSchema
            .findOne({ _id: userId })
            .populate('products'); 

        console.log(singleUser);

        if (!singleUser) {
            return res.status(404).json({
                message: `User with this ${userId} not found`,
            });
        }

        res.status(200).json({
            data: singleUser,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
