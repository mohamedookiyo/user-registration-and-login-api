import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Hash the user password before saving to the database
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

// Check if password is correct
export const comparePassword = async (password, userPassword) => {
    const isMatch = await bcrypt.compare(password, userPassword);

    return isMatch;
};

// Protect private routes from unauthorized users
export const authorizedRoutes = async (req, res, next) => {
    // Check if user is authenticated
    try {
        let userToken;

        // Check if the request has the required header
        if (req.header("Authorization")) {
            userToken = req.header("Authorization").replace("Bearer ", "");
        }

        // Check if token is valid
        if (userToken) {
            const verifyToken = jwt.verify(
                userToken,
                process.env.JWT_SECRET_KEY
            );

            // Check if the token is still attached to a user
            const user = await User.findById({ _id: verifyToken.id });

            if (user) {
                req.user = user._id;
            } else {
                return res.status(403).json({
                    // User deleted account and token is still valid
                    message:
                        "There is no current user that this token is attached to.",
                });
            }

            // Proceed to the next handler
            next();
        } else {
            res.status(401).json({
                message: "You are not authorized to access this page.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
