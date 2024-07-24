const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://ired-1.onrender.com','http://localhost:3000'], // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes Middleware
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Error Middleware
const errorHandler = require("./middleWare/errorMiddleware"); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
mongoose 
   .connect(process.env.MONGO_URI)
   .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`);  
        })
    })
   .catch((err) => console.log(err))   