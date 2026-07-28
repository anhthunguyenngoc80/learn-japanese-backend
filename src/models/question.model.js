const pool = require("../config/db");

const createQuestions = async (questions, executor = pool) => {
  if (!questions || questions.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const q of questions) {
    params.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
    values.push(q.section_id, q.question_type, q.content);
    paramIndex += 3;
  }

  const query = `insert into questions (section_id, question_type, content) values ${params.join(", ")} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const getQuestionsBySectionId = async (section_id, executor = pool) => {
  const result = await executor.query(
    "select * from questions where section_id=$1 order by question_id",
    [section_id],
  );
  return result.rows;
};

const updateQuestion = async (question_id, question_type, content, executor = pool) => {
  const result = await executor.query(
    "update questions set question_type=$1, content=$2 where question_id=$3 returning *",
    [question_type, content, question_id],
  );
  return result.rows[0];
};

const updateQuestions = async (questions, executor = pool) => {
  if (!questions || questions.length === 0) return [];
  const results = [];

  for (const q of questions) {
    if (!q.question_id) continue;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (q.question_type !== undefined) {
      fields.push(`question_type = $${paramIndex++}`);
      values.push(q.question_type);
    }
    if (q.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(q.content);
    }

    if (fields.length === 0) continue;

    values.push(q.question_id);
    const query = `update questions set ${fields.join(", ")} where question_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

const deleteQuestion = async (question_id, executor = pool) => {
  const result = await executor.query(
    "delete from questions where question_id=$1 returning *",
    [question_id],
  );
  return result.rows[0];
};

module.exports = {
  createQuestions,
  getQuestionsBySectionId,
  updateQuestion,
  updateQuestions,
  deleteQuestion,
};