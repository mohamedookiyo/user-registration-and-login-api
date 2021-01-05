# user-registration-and-login-api

A user authentication REST API built with Node.js, Express, and MongoDB Atlas with security in mind.

-   JSON Web Token for authentication and authorization.
-   Bcrypt for password hashing.
-   Regular expressions for password criteria.
-   Input validation for correct data.

---

### Here is what you need to do:

-   Create a **.env** file at the root directory of the project and add these variables to it:
    -   MONGODB_URI = MongoDB database URI.
    -   JWT_SECRET_KEY = the secret key for signing and verifying JSON Web Token keys.

---

### API Endpoints

-   GET Requests:
    -   user/login
    -   user/register
    -   user/profile
-   POST requests:
    -   user/login
    -   user/register
    -   user/is-token-valid
    -   user/change-password
-   DELETE requests:
    -   user/delete-account
