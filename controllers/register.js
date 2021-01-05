import User from "../models/user.js";
import { errorMessage, validateRegisterForm } from "../validations/users.js";
import { hashPassword } from "../auth/auth.js";

// Handle user registration
export const registerUser = (req, res) => {
    const user = req.body;

    try {
        // Validate the registration form
        validateRegisterForm(user)
            .then((response) => {
                // If response is true, hash the password
                if (response) {
                    hashPassword(user.password)
                        .then(async (hash) => {
                            const { name, email } = user;
                            const newUser = new User({
                                name,
                                email,
                                password: hash,
                            });

                            // Save the user
                            const savedUser = await newUser.save();
                            res.status(201).json(savedUser);
                        })
                        .catch((error) => {
                            res.status(500).json({ message: error.message });
                        });
                }
                // But if response is false, show the error message
                else {
                    res.status(400).json({
                        message: errorMessage(),
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
