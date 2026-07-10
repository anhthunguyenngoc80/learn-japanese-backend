const pool = require("../config/db");
const models = require("../models");

const createCollection = async (user_id, name, visibility, topics) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const collection = await models.Collection.createCollection(
      user_id,
      name,
      visibility,
      client,
    );

    for (const topic of topics) {
      const topicRow = await models.Topic.createTopic(
        collection.collection_id,
        topic.name,
        client,
      );

      if (topic.words?.length) {
        for (const word of topic.words) {
          const wordRow = await models.Word.createWord(
            topicRow.topic_id,
            word,
            client,
          );

          if (word.examples?.length) {
            for (const example of word.examples) {
              await models.Example.createExample(
                wordRow.word_id,
                example.content,
                example.meaning,
                client,
              );
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

const deleteCollection = async (collection_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await models.Example.deleteByCollectionId(collection_id, client);
    await models.Word.deleteByCollectionId(collection_id, client);
    await models.Topic.deleteByCollectionId(collection_id, client);
    const result = await models.Collection.deleteCollection(
      collection_id,
      client,
    );

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getCollectionDetail = async (collection_id) => {
  const collections = await models.Collection.getCollectionById(collection_id);
  if (!collections || collections.length === 0) {
    return null;
  }

  const collection = collections[0];
  const topics = await models.Topic.getAllTopics(collection_id);

  return {
    collection_id: collection.collection_id,
    name: collection.name,
    topics: topics,
  };
};

const getAllCollections = async (user_id) => {
  return await models.Collection.getAllCollections(user_id);
};

module.exports = {
  createCollection,
  deleteCollection,
  getCollectionDetail,
  getAllCollections,
};
