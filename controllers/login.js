import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { errorMessage, validateLoginForm } from "../validations/users.js";
import { comparePassword } from "../auth/auth.js";

// Handle user login
export const loginUser = async (req, res) => {
    const userInfo = req.body;

    try {
        // If validateLoginForm is true
        if (validateLoginForm(userInfo)) {
            // Check if user exists
            const user = await User.findOne({ email: userInfo.email });

            // If user does not exist
            if (!user) {
                return res.status(404).json({
                    message: "An account with this email does not exist.",
                });
            }

            // Check if password is correct
            comparePassword(userInfo.password, user.password)
                .then((response) => {
                    // If password is correct
                    if (response) {
                        // Login the user
                        const token = jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET_KEY
                        );

                        res.status(200).json({
                            token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                date: user.date,
                            },
                        });
                    } else {
                        res.status(401).json({
                            message: "Invalid credentials.",
                        });
                    }
                })
                .catch((error) => {
                    res.status(500).json({
                        message: error.message,
                    });
                });
        }
        // But if response is false, show the error message
        else {
            res.status(400).json({ message: errorMessage() });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
