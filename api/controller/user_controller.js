import User from '../models/user_model.js';
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

// Controller for User
const UserController = {

   

    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            if (req.user.id !== id) {
                return res.status(403).json({ message: "You can update only your account!" });
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const user = await User.findByIdAndUpdate(id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                }
            }, { new: true });

            const { password, ...others } = user._doc;
            res.status(200).json({ message: "User updated successfully", others });

        } catch (error) {
            return res.status(500).json({ message: "An error occurred while updating the user", error });
        }
    }
};

export default UserController;