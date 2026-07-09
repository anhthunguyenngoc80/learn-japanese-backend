const collectionService = require("../service/collection.service");

const createCollection = async (req, res) => {
  const { name, topics } = req.body;
  const user_id = req.user.user_id;
  try {
    const result = await collectionService.createCollection(
      user_id,
      name,
      topics || [],
    );
    res.status(201).json({ message: "Create successfull", data: result });
  } catch (error) {
    console.log("Create collection failed", error);
    res.status(401).json({ message: "Create failed" });
  }
};

const getAllCollections = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const result = await collectionService.getAllCollections(user_id);
    res
      .status(201)
      .json({ message: "Get collections successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const getCollectionById = async (req, res) => {
  const user_id = req.user.user_id;
  const { collectionId } = req.params;
  const { limit } = req.query;
  try {
    const result = await collectionService.getCollectionDetail(
      user_id,
      collectionId,
      limit,
    );
    if (!result) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res
      .status(200)
      .json({ message: "Get collection successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(401).json({ message: "Query failed" });
  }
};

const deleteCollection = async (req, res) => {
  const user_id = req.user.user_id;
  const { collectionId } = req.params;
  try {
    const result = await collectionService.deleteCollection(
      user_id,
      collectionId,
    );
    if (!result) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log("Delete collection failed", error);
    res.status(401).json({ message: "Delete failed" });
  }
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  deleteCollection,
};
