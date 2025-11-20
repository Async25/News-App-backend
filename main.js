const express = require('express')
const { Database } = require('./Config/db.js')
const fileUpload = require('express-fileupload')
const newsRoutes = require('./routes/newsRoutes.js');
const authRoutes = require('./routes/authRoutes.js')
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const DB_URI = process.env.MONGO_URI
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 }, abortOnLimit: true }));
app.use('/news', newsRoutes);
app.use('/',authRoutes);

// conncting to database 

Database(DB_URI)




app.listen(port, () => {
    console.log("server is listing on ", port)
})

