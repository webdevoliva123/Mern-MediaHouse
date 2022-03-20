const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require("./configs/mongo");

//config .env
dotenv.config({path : "./configs/config.env"});

// express application
const app = express();

// applying cors
app.use(cors());

// App use
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());


// Importing routers
const userRoutes = require("./routers/userRoutes");
const tempBlogCreateRoutes = require('./routers/tempBlogCreateRoutes');
const blogRoutes = require('./routers/blogRoutes');
const protectRoutes = require('./routers/protectRoutes');

// for userRoutes
app.use("/api/v1", userRoutes);

// for create blogs
app.use("/api/v1",tempBlogCreateRoutes);

// for blogs
app.use("/api/v1",blogRoutes);

// for protected routes
app.use("/api/v1",protectRoutes);


const PORT = process.env.PORT || 8080;

// createing server
app.listen(PORT, () => {
    console.log(`XcitEdu Media Server is running on : http://localhost:${PORT} `);
    // Connecting to mongodb server
    connectDB();
});
