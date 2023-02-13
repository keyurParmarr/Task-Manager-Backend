const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const taskroutes = require("./taskRoutes");
const loginrouter = require("./loginroute");
const signuprouter = require("./signuproute");
const { getUserfromToken } = require("./token");
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use("/api/tasks", taskroutes);
app.use("/login", loginrouter);
app.use("/signup", signuprouter);
app.use("/tokenlogin", getUserfromToken);

const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("5000 running");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const startser = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("5000 running");
    });
  } catch (error) {
    console.log(error);
  }
};
startser();
