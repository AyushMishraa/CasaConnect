const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const mongoDbURI = process.env.DB_HOST;
const connectToDb = async () => {
    try {
      await mongoose.connect(mongoDbURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("MongoDB Altas is connected successfully");
    } catch (error) {
      console.log("error during connecting to DB:-", error);
      process.exit(1);
    }
};

module.exports = connectToDb;