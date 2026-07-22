const exampleModel = require("../models/example.model");

const createExample = async (req, res) => {
  const { wordId } = req.params;
  const { content, meaning } = req.body;
  try {
    const result = await exampleModel.createExample(wordId, content, meaning);
    res.status(201).json({ message: "Create example successfully", data: result[0] });
  } catch (error) {
    console.log("Create example failed", error);
    res.status(401).json({ message: "Create example failed" });
  }
};

const updateExample = async (req, res) => {
  const { exampleId } = req.params;
  const { content, meaning } = req.body;
  try {
    const result = await exampleModel.updateExample(exampleId, content, meaning);
    if (!result) {
      return res.status(404).json({ message: "Example not found" });
    }
    res.status(200).json({ message: "Update example successfully", data: result });
  } catch (error) {
    console.log("Update example failed", error);
    res.status(500).json({ message: "Update example failed" });
  }
};

const deleteExample = async (req, res) => {
  const { exampleId } = req.params;
  try {
    const result = await exampleModel.deleteExample(exampleId);
    if (!result) {
      return res.status(404).json({ message: "Example not found" });
    }
    res.status(200).json({ message: "Delete example successfully", data: result });
  } catch (error) {
    console.log("Delete example failed", error);
    res.status(500).json({ message: "Delete example failed" });
  }
};

const createExamplesBulk = async (req, res) => {
  const { wordId } = req.params;
  const { examples } = req.body;
  try {
    if (!Array.isArray(examples) || examples.length === 0) {
      return res.status(400).json({ message: "Examples array is required" });
    }
    const result = await exampleModel.createExamples(wordId, examples);
    res.status(201).json({ message: "Create examples successfully", data: result });
  } catch (error) {
    console.log("Create examples failed", error);
    res.status(401).json({ message: "Create examples failed" });
  }
};

const updateExamplesBulk = async (req, res) => {
  const { examples } = req.body;
  try {
    if (!Array.isArray(examples) || examples.length === 0) {
      return res.status(400).json({ message: "Examples array is required" });
    }
    const result = await exampleModel.updateExamples(examples);
    res.status(200).json({ message: "Update examples successfully", data: result });
  } catch (error) {
    console.log("Update examples failed", error);
    res.status(500).json({ message: "Update examples failed" });
  }
};

module.exports = {
  createExample,
  createExamplesBulk,
  updateExample,
  updateExamplesBulk,
  deleteExample,
};
