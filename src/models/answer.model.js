const pool = require("../config/db");

const createAnswers = async (answers, executor = pool) => {
  if (!answers || answers.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const ans of answers) {
    params.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
    values.push(ans.learning_item_id, ans.content, ans.is_correct);
    paramIndex += 3;
  }

  const query = `insert into answers (learning_item_id, content, is_correct) values ${params.join(", ")} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const getAnswersByLearningItemId = async (learning_item_id, executor = pool) => {
  const result = await executor.query(
    "select * from answers where learning_item_id=$1 order by answer_id",
    [learning_item_id],
  );
  return result.rows;
};

const updateAnswer = async (answer_id, content, is_correct, executor = pool) => {
  const result = await executor.query(
    "update answers set content=$1, is_correct=$2 where answer_id=$3 returning *",
    [content, is_correct, answer_id],
  );
  return result.rows[0];
};

const updateAnswers = async (answers, executor = pool) => {
  if (!answers || answers.length === 0) return [];
  const results = [];

  for (const ans of answers) {
    if (!ans.answer_id) continue;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (ans.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(ans.content);
    }
    if (ans.is_correct !== undefined) {
      fields.push(`is_correct = $${paramIndex++}`);
      values.push(ans.is_correct);
    }

    if (fields.length === 0) continue;

    values.push(ans.answer_id);
    const query = `update answers set ${fields.join(", ")} where answer_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

const deleteAnswer = async (answer_id, executor = pool) => {
  const result = await executor.query(
    "delete from answers where answer_id=$1 returning *",
    [answer_id],
  );
  return result.rows[0];
};

module.exports = {
  createAnswers,
  getAnswersByLearningItemId,
  updateAnswer,
  updateAnswers,
  deleteAnswer,
};
