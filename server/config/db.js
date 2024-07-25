const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/GraphQL")
    .then(()=>console.log("DB connected..."))
    .catch(e =>console.log(e))
 };

 module.exports = connectDB;