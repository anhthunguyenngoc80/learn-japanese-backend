const pool = require("../config/db");
const models = require("../models");

const createCollection = async (user_id, name, topics) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const collection = await models.Collection.createCollection(user_id, name, client);

    for (const topic of topics) {
      const topicRow = await models.Topic.createTopic(collection.collection_id, topic.name, client);

      if (topic.words?.length) {
        for (const word of topic.words) {
          const wordRow = await models.Word.createWord(topicRow.topic_id, word, client);

          if (word.examples?.length) {
            for (const example of word.examples) {
              await models.Example.createExample(wordRow.word_id, example.content, example.meaning, client);
            }
          }
        }
      }
    }

    await client.query("COMMIT");
    return collection;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const deleteCollection = async (user_id, collection_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await models.Example.deleteByCollectionId(collection_id, client);
    await models.Word.deleteByCollectionId(collection_id, client);
    await models.Topic.deleteByCollectionId(collection_id, client);
    const result = await models.Collection.deleteCollection(user_id, collection_id, client);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createCollection, deleteCollection };
