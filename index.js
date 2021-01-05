import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

// Load routes
import usersRoute from "./routes/users.js";

// Setup Express App
const app = express();

// Middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Connect to the database
const URI = process.env.MONGODB_URI;
mongoose
    .connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log(error.message));

// Use routes
app.use("/user", usersRoute);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on port: ${PORT}`));
