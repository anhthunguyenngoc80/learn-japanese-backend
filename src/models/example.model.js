const pool = require("../config/db");

const createExample = async (word_id, content, meaning, executor = pool) => {
  const result = await executor.query(
    "insert into examples (word_id, content, meaning) values ($1, $2, $3) returning *",
    [word_id, content, meaning],
  );
  return result.rows[0];
};

const createExamples = async (word_id, examples, executor = pool) => {
  if (!examples || examples.length === 0) return [];
  const values = [];
  const params = [];
  let paramIndex = 1;

  for (const ex of examples) {
    params.push(
      `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`
    );
    values.push(word_id, ex.content, ex.meaning);
    paramIndex += 3;
  }

  const query = `insert into examples (word_id, content, meaning) values ${params.join(
    ", "
  )} returning *`;
  const result = await executor.query(query, values);
  return result.rows;
};

const deleteByCollectionId = async (collection_id, executor = pool) => {
  const result = await executor.query(
    `delete from examples where word_id in (
      select w.word_id from words w
      join topics t on w.topic_id = t.topic_id
      where t.collection_id = $1
    )`,
    [collection_id],
  );
  return result;
};

const getExamplesByWordId = async (word_id, executor = pool) => {
  const result = await executor.query(
    "select * from examples where word_id=$1",
    [word_id],
  );
  return result.rows;
};

const updateExample = async (example_id, content, meaning, executor = pool) => {
  const result = await executor.query(
    "update examples set content=$1, meaning=$2 where example_id=$3 returning *",
    [content, meaning, example_id],
  );
  return result.rows[0];
};

const updateExamples = async (examples, executor = pool) => {
  if (!examples || examples.length === 0) return [];
  const results = [];

  for (const ex of examples) {
    if (ex.example_id === undefined) continue;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (ex.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(ex.content);
    }
    if (ex.meaning !== undefined) {
      fields.push(`meaning = $${paramIndex++}`);
      values.push(ex.meaning);
    }

    if (fields.length === 0) continue;

    values.push(ex.example_id);
    const query = `update examples set ${fields.join(", ")} where example_id = $${paramIndex} returning *`;
    const result = await executor.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

const deleteExample = async (example_id, executor = pool) => {
  const result = await executor.query(
    "delete from examples where example_id=$1 returning *",
    [example_id],
  );
  return result.rows[0];
};

module.exports = {
  createExample,
  createExamples,
  updateExample,
  updateExamples,
  deleteExample,
  deleteByCollectionId,
  getExamplesByWordId,
};
