const pool = require("../config/db");

const createSections = async (sections, executor = pool) => {
  if (!sections || sections.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const section of sections) {
    params.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
    values.push(section.topic_id, section.section_type, section.content);
    paramIndex += 3;
  }

  const query = `insert into sections (topic_id, section_type, content) values ${params.join(", ")} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const getSectionsByTopicId = async (topic_id, executor = pool) => {
  const result = await executor.query(
    "select * from sections where topic_id=$1 order by section_id",
    [topic_id],
  );
  return result.rows;
};

module.exports = {
  createSections,
  getSectionsByTopicId,
};