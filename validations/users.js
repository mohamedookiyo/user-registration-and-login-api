import User from "../models/user.js";

// Error handling
let message = "";
export const errorMessage = () => message;

// Password criteria validation
function checkPasswordCriteria(password) {
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&^*])(?=.{8,})/;

    // Test criteria
    let isValid = passwordCriteria.test(password);

    return isValid ? true : false;
}

// Login form validation
export const validateLoginForm = (formInfo) => {
    const { email, password } = formInfo;

    // Check if there is any missing field
    if (!email || !password) {
        message = "All fields are required.";
        return false;
    }

    return true;
};

// Register form validation
export const validateRegisterForm = async (formInfo) => {
    const { name, email, password, confirmPassword } = formInfo;

    // Check if there is any missing field
    if (!name || !email || !password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    // Check if email is already registered
    const isEmailRegistered = await User.findOne({ email: email });
    if (isEmailRegistered) {
        message = "An account with this email already exists.";
        return false;
    }

    // Check if password meets criteria
    const isPasswordValid = checkPasswordCriteria(password);

    if (isPasswordValid) {
        // Check if the passwords match
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";

        return false;
    }

    return true;
};

// Change password form validation
export const validateChangePasswordForm = (formInfo) => {
    const { password, confirmPassword } = formInfo;

    // Check if there is any missing field
    if (!password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    // Check if password meets criteria
    const isPasswordValid = checkPasswordCriteria(password);

    if (isPasswordValid) {
        // Check if the passwords match
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";

        return false;
    }

    return true;
};
