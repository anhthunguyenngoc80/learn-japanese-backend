const pool = require("../config/db");

const createSections = async (sections, executor = pool) => {
  if (!sections || sections.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const section of sections) {
    params.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3})`);
    values.push(section.topic_id, section.section_type, section.content, section.order);
    paramIndex += 4;
  }

  const query = `insert into sections (topic_id, section_type, content, order) values ${params.join(", ")} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const getSectionsByTopicId = async (topic_id, executor = pool) => {
  const result = await executor.query(
    "select * from sections where topic_id=$1 order by order",
    [topic_id],
  );
  return result.rows;
};

const updateSections = async (sections, executor = pool) => {
  if (!sections || sections.length === 0) return [];
  const results = [];

  for (const section of sections) {
    if (!section.section_id && !section.order) continue;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (section.section_type !== undefined) {
      fields.push(`section_type = $${paramIndex++}`);
      values.push(section.section_type);
    }
    if (section.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(section.content);
    }
    if (section.order !== undefined) {
      fields.push(`section_order = $${paramIndex++}`);
      values.push(section.order);
    }

    if (fields.length === 0) continue;

    values.push(section.section_id);
    const query = `update sections set ${fields.join(", ")} where section_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

module.exports = {
  createSections,
  getSectionsByTopicId,
  updateSections,
};
