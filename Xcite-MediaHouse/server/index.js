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
const blogCreateRoutes = require('./routers/createBlogRoutes');
const blogRoutes = require('./routers/blogRoutes');
const protectRoutes = require('./routers/protectRoutes');
const jounRoutes = require('./routers/jounRoutes');
const adminRoutes = require('./routers/adminRoutes')

// for userRoutes
app.use("/api/v1", userRoutes);

// for create blogs
app.use("/api/v1",blogCreateRoutes);

// for blogs
app.use("/api/v1",blogRoutes);

// for protected routes
app.use("/api/v1",protectRoutes);

//for journalist routes
app.use("/api/v2",jounRoutes);

// for admin routes
app.use("/api/v3",adminRoutes);


const PORT = process.env.PORT || 8080;

// createing server
app.listen(PORT, () => {
    console.log(`XcitEdu Media Server is running on : http://localhost:${PORT} `);
    // Connecting to mongodb server
    connectDB();
});
