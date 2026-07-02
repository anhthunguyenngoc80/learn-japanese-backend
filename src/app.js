const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/user.routes");
const collectionRoutes = require("./routes/collection.route");

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/collections", collectionRoutes);

module.exports = app;
