const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const connectToDb = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser");
const contactOwner = require('./routes/contactOwner');
const searchProperties = require('./routes/searchPropertiesRoutes');
const pagingRoute = require('./routes/paginationRoutes');
const app = express();

dotenv.config();

connectToDb();

app.use(cookieParser());

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:true})); // to parse the form data


app.use("/api/auth", authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/property', contactOwner);
app.use('/api/property', searchProperties);
app.use('/api/property', pagingRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});