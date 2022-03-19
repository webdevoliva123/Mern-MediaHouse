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


// for userRoutes
app.use("/api/v1", userRoutes);




const PORT = process.env.PORT || 8080;

// createing server
app.listen(PORT, () => {
    console.log(`XcitEdu Media Server is running on : http://localhost:${PORT} `);
    // Connecting to mongodb server
    connectDB();
});
