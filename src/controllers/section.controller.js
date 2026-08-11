const sectionService = require("../service/section.service");

const createSections = async (req, res) => {
  const { topicId } = req.params;
  const { sections } = req.body;

  try {
    if (!Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: "Sections array is required" });
    }

    const result = await sectionService.createSections(topicId, sections);
    res.status(201).json({ message: "Create sections successfully", data: result });
  } catch (error) {
    console.log("Create sections failed", error);
    res.status(500).json({ message: "Create sections failed" });
  }
};

const updateSectionsBulk = async (req, res) => {
  const { sections } = req.body;

  try {
    if (!Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ message: "Sections array is required" });
    }

    const result = await sectionService.updateSections(sections);
    res.status(200).json({ message: "Update sections successfully", data: result });
  } catch (error) {
    console.log("Update sections failed", error);
    res.status(500).json({ message: "Update sections failed" });
  }
};

const getSectionsByTopicId = async (req, res) => {
  const { topicId } = req.params;

  try {
    const result = await sectionService.getSectionsByTopicId(topicId);
    res.status(200).json({ message: "Get sections successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(500).json({ message: "Query failed" });
  }
};

const getSectionById = async (req, res) => {
  const { sectionId } = req.params;
  const { limit } = req.query;
  const user_id = req.user?.user_id;

  try {
    const result = await sectionService.getSectionById(user_id, sectionId, limit);
    if (!result) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.status(200).json({ message: "Get section successfully", data: result });
  } catch (error) {
    console.log("Query failed", error);
    res.status(500).json({ message: "Query failed" });
  }
};

module.exports = { createSections, updateSectionsBulk, getSectionsByTopicId, getSectionById };
