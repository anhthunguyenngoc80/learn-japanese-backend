const express = require("express");
const router = express.Router();

const exampleController = require("../controllers/example.controller");
const { verifyToken } = require("../middlewave/auth.middleware");
const { validate } = require("../middlewave/validate.middleware");
const {
  UpdateExamplesBulkSchema,
  UpdateExampleSchema,
  ExampleIdParams,
} = require("../schema");

router.put("/:exampleId", verifyToken, validate(UpdateExampleSchema), exampleController.updateExample);
router.delete("/:exampleId", verifyToken, validate(ExampleIdParams), exampleController.deleteExample);
router.put("/bulk", verifyToken, validate(UpdateExamplesBulkSchema), exampleController.updateExamplesBulk);

module.exports = router;