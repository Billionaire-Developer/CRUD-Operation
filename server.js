require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');


const itemsRoutes = require("./routes/index.js");
const app = express();
const cors = require("cors");

app.use(cors());  //handles cors
app.use(express.json());  // parse json

// Root route
app.get("/", (req, res) => {
    res.send("API is running...");
});
// Routes
app.use("/api/items", itemsRoutes);

app.get('/', require("./routes"));
app.use('/', require('./routes/index'));


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, x-Requested-with, Control-type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.listen(port, () => {console.log(`App is listening on port ${port}`)});