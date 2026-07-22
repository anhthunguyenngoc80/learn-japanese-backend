const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const app = express();

const routes = require("./routes/index");
const openApiDocument = require("./openapi");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  })
);

// Optional: serve the raw OpenAPI JSON
app.get("/api-docs.json", (req, res) => {
  res.json(openApiDocument);
});

module.exports = app;
