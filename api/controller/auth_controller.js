import  User  from "../models/user_model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
const AuthController = {

    signup : async (req,res,next)=>{
        const { username, password, email } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        try {
            await newUser.save();
            res.status(201).json({message:"User add database successfully"});
        } catch (error) {
            next(errorHandler(500,"Error add user database"));
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return next(errorHandler(404, "User not found"));
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return next(errorHandler(401, "Invalid password"));
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json({ message: "Login successfully" , ...rest });
        } catch (error) {
            console.error("Login error:", error); // Hiển thị lỗi chi tiết trong console
            next(errorHandler(500, "Error login"));
        }
    }

}
export default AuthController;