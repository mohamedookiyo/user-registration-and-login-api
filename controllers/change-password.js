import User from "../models/user.js";
import {
    errorMessage,
    validateChangePasswordForm,
} from "../validations/users.js";
import { hashPassword, comparePassword } from "../auth/auth.js";

// Handle password change
export const changePassword = async (req, res) => {
    const userInfo = req.body;

    try {
        // If validateChangePasswordForm is true
        if (validateChangePasswordForm(userInfo)) {
            // Logged in user
            const user = await User.findById({ _id: req.user._id });

            // Check if new password is same as old password
            comparePassword(userInfo.password, user.password)
                .then((response) => {
                    // If response is true
                    if (response) {
                        res.status(400).json({
                            message: "Choose a new password.",
                        });
                    } else {
                        // Hash the new password
                        hashPassword(userInfo.password)
                            .then(async (hash) => {
                                // Update the password field
                                await User.findByIdAndUpdate(
                                    { _id: req.user._id },
                                    { password: hash }
                                );

                                res.status(200).json({
                                    message:
                                        "Password has been successfully updated.",
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    message: error.message,
                                });
                            });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                });
        } else {
            res.status(400).json({ message: errorMessage() });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
