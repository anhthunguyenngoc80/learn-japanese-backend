const collectionModel = require("../model/collection.model");

const createCollection = async (req, res) => {
  const { user_id, name } = req.body;
  try {
    const result = collectionModel.createCollection(user_id, name);
    res.status(201).json({ message: "Create successfull" });
  } catch (error) {
    console.log("Create collection failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllCollections = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = collectionModel.getAllCollections(user_id);
    res.status(201).json({ message: "Get collections successfully" });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getCollectionById = async (req, res) => {
  const { user_id } = req.body;
  const { collectionId } = req.params;
  try {
    const result = collectionModel.getCollectionById(user_id, collectionId);
    res.status(201).json({ message: "Get collection successfully" });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
};
