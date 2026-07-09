const models = require("../models");

const getTopicById = async (topic_id, limit) => {
  const topic = await models.Topic.getTopicById(topic_id);
  if (!topic) {
    return null;
  }

  const words = limit
    ? await models.Word.getWordsByLimit(topic.topic_id, limit)
    : await models.Word.getAllWords(topic.topic_id);

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
};

module.exports = { getTopicById };