const express = require("express");
const cors = require("cors");

const app = express();

const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

module.exports = app;
