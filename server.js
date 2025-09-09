const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const connectToDb = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

connectToDb();

app.use(cookieParser());

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:true})); // to parse the form data

// Routes (we will add later)
app.use("/api/auth", authRoutes );
app.use('/api/properties', propertyRoutes);
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/inquiries", require("./routes/inquiryRoutes"));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});