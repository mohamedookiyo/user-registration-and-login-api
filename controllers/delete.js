import User from "../models/user.js";

// Handle user deletion
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        // Check if a user with that ID exists
        const user = await User.findById({ _id: id });

        // If user exists
        if (user) {
            // check if it's the account of the current logged in user
            if (user._id.toString() === req.user._id.toString()) {
                // ID = current logged in users ID
                // Delete user
                const deletedUser = await User.findByIdAndDelete({
                    _id: user._id,
                });

                res.status(200).json({
                    message: "Account has been successfully deleted.",
                    user: { name: deletedUser.name },
                });
            } else {
                // ID = other users ID
                res.status(400).json({
                    message: "Can not delete an account that is not yours.",
                });
            }
        } else {
            // ID = wrong ID
            res.status(400).json({
                message: "There is no user with this id",
                id: req.params.id,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
