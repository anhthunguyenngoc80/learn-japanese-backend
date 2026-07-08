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

const getCollectionDetail = async (user_id, collection_id) => {
  const collections = await models.Collection.getCollectionById(user_id, collection_id);
  if (!collections || collections.length === 0) {
    return null;
  }

  const collection = collections[0];
  const topics = await models.Topic.getAllTopics(collection_id);

  const topicsWithWords = await Promise.all(
    topics.map(async (topic) => {
      const words = await models.Word.getAllWords(topic.topic_id);

      const wordsWithExamples = await Promise.all(
        words.map(async (word) => {
          const examples = await models.Example.getExamplesByWordId(word.word_id);
          return {
            word_id: word.word_id,
            topic_id: word.topic_id,
            text: word.text,
            sv_word: word.sv_word,
            reading: word.reading,
            meaning: word.meaning,
            partOfSpeech: word.part_of_speech,
            learned: word.learned,
            examples: examples.map((ex) => ({
              example_id: ex.example_id,
              word_id: ex.word_id,
              content: ex.content,
              meaning: ex.meaning,
            })),
          };
        }),
      );

      return {
        collection_id: topic.collection_id,
        topic_id: topic.topic_id,
        name: topic.name,
        words: wordsWithExamples,
      };
    }),
  );

  return {
    collection_id: collection.collection_id,
    name: collection.name,
    topics: topicsWithWords,
  };
};

const getAllCollections = async (user_id) => {
  return await models.Collection.getAllCollections(user_id);
};

module.exports = { createCollection, deleteCollection, getCollectionDetail, getAllCollections };
