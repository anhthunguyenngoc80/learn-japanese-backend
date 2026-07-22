const { z } = require("zod");

// ==================== Auth Schemas ====================
const RegisterSchema = z.object({
  body: z.object({
    username: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

// ==================== Collection Schemas ====================
const CreateCollectionSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    visibility: z.enum(["public", "private"]),
    topics: z
      .array(
        z.object({
          name: z.string().min(1).max(100),
        })
      )
      .optional()
      .default([]),
  }),
});

const CollectionIdParams = z.object({
  params: z.object({
    collectionId: z.coerce.number().int().positive(),
  }),
});

// ==================== Topic Schemas ====================
const CreateTopicSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
  }),
  params: z.object({
    collectionId: z.coerce.number().int().positive(),
  }),
});

const TopicIdParams = z.object({
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
});

// ==================== Word Schemas ====================
const CreateWordSchema = z.object({
  body: z.object({
    text: z.string().min(1),
    sv_word: z.string().min(1),
    reading: z.string().min(1),
    meaning: z.string().min(1),
    part_of_speech: z.string().optional(),
  }),
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
});

const CreateWordsBulkSchema = z.object({
  body: z.object({
    words: z
      .array(
        z.object({
          text: z.string().min(1),
          sv_word: z.string().min(1),
          reading: z.string().min(1),
          meaning: z.string().min(1),
          part_of_speech: z.string().optional(),
        })
      )
      .min(1),
  }),
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
});

const UpdateWordsBulkSchema = z.object({
  body: z.object({
    words: z
      .array(
        z.object({
          word_id: z.number().int().positive(),
          text: z.string().min(1).optional(),
          sv_word: z.string().min(1).optional(),
          reading: z.string().min(1).optional(),
          meaning: z.string().min(1).optional(),
          part_of_speech: z.string().optional(),
        })
      )
      .min(1),
  }),
});

const TopicIdParamsWords = z.object({
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
});

const WordIdParams = z.object({
  params: z.object({
    wordId: z.coerce.number().int().positive(),
  }),
});

const CreateExampleSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    meaning: z.string().min(1),
  }),
  params: z.object({
    wordId: z.coerce.number().int().positive(),
  }),
});

const UpdateExampleSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    meaning: z.string().min(1),
  }),
  params: z.object({
    exampleId: z.coerce.number().int().positive(),
  }),
});

const ExampleIdParams = z.object({
  params: z.object({
    exampleId: z.coerce.number().int().positive(),
  }),
});

const CreateExamplesBulkSchema = z.object({
  body: z.object({
    examples: z
      .array(
        z.object({
          content: z.string().min(1),
          meaning: z.string().min(1),
        })
      )
      .min(1),
  }),
  params: z.object({
    wordId: z.coerce.number().int().positive(),
  }),
});

const UpdateExamplesBulkSchema = z.object({
  body: z.object({
    examples: z
      .array(
        z.object({
          example_id: z.number().int().positive(),
          content: z.string().min(1).optional(),
          meaning: z.string().min(1).optional(),
        })
      )
      .min(1),
  }),
});

// ==================== Review Schemas ====================
const ReviewTopicParams = z.object({
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
  query: z.object({
    limit: z.coerce.number().int().positive().optional().default(10),
  }),
});

const UpdateMasterySchema = z.object({
  body: z.object({
    word_id: z.number().int().positive(),
    skill: z.enum(["recognition", "listening", "writing"]),
    is_correct: z.boolean(),
    response_time_ms: z.number().int().nonnegative(),
  }),
});

module.exports = {
  RegisterSchema,
  LoginSchema,
  CreateCollectionSchema,
  CollectionIdParams,
  CreateTopicSchema,
  TopicIdParams,
  CreateWordSchema,
  CreateWordsBulkSchema,
  UpdateWordsBulkSchema,
  TopicIdParamsWords,
  WordIdParams,
  CreateExampleSchema,
  UpdateExampleSchema,
  ExampleIdParams,
  CreateExamplesBulkSchema,
  UpdateExamplesBulkSchema,
  ReviewTopicParams,
  UpdateMasterySchema,
};
