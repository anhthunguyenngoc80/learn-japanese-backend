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

module.exports = { createSections };