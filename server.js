const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const spRoute = require('./routes/sp.route.js');
const catRoute = require('./routes/cat.route.js');
const cookieParser = require("cookie-parser");
const reviewRoute = require('./routes/review.route.js');
const productRoute = require('./routes/product.route.js');
const productCatRoute = require('./routes/productCat.route.js');
const freelanceCatRoute = require('./routes/freelanceCat.route.js');

const cors = require("cors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000", "https://roothq.africa", "https://www.roothq.africa"],
  credentials: true,
}));


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/services", spRoute); 
app.use("/api/cat", catRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/products", productRoute);
app.use("/api/productCat", productCatRoute);
app.use("/api/freelanceCat", freelanceCatRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}!`);
});
