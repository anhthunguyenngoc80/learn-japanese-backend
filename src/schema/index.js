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
    sv_word: z.string().optional(),
    reading: z.string().optional(),
    meaning: z.string().min(1),
    part_of_speech: z.string().optional(),
  }),
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
  }),
});

const CreateWordsBulkSchema = z.object({
  body: z.object({
    words: z
      .array(
        z.object({
          section_id: z.number().int().positive(),
          text: z.string().min(1),
          sv_word: z.string().optional(),
          reading: z.string().optional(),
          meaning: z.string().min(1),
          part_of_speech: z.string().optional(),
        })
      )
      .min(1),
  }),
});

const UpdateWordsBulkSchema = z.object({
  body: z.object({
    words: z
      .array(
        z.object({
          word_id: z.number().int().positive(),
          text: z.string().min(1).optional(),
          sv_word: z.string().optional(),
          reading: z.string().optional(),
          meaning: z.string().min(1).optional(),
          part_of_speech: z.string().optional(),
        })
      )
      .min(1),
  }),
});

const SectionIdParamsWords = z.object({
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
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
          learning_item_id: z.number().int().positive(),
          content: z.string().min(1),
          meaning: z.string().optional(),
        })
      )
      .min(1),
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

// ==================== Section Schemas ====================
const CreateSectionsBulkSchema = z.object({
  body: z.object({
    sections: z
      .array(
        z.object({
          section_type: z.string().min(1),
          content: z.string().min(1),
          order: z.number().int().nonnegative(),
        })
      )
      .min(1),
  }),
  params: z.object({
    topicId: z.coerce.number().int().positive(),
  }),
});

const UpdateSectionsBulkSchema = z.object({
  body: z.object({
    sections: z
      .array(
        z.object({
          section_id: z.number().int().positive(),
          section_type: z.string().min(1).optional(),
          content: z.string().min(1).optional(),
          order: z.number().int().nonnegative().optional(),
        })
      )
      .min(1),
  }),
});

const SectionIdParams = z.object({
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
  }),
});

const GetSectionSchema = z.object({
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
  }),
  query: z.object({
    limit: z.coerce.number().int().positive().optional(),
  }),
});

const CreateQuestionsBulkSchema = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          question_type: z.string().min(1),
          content: z.string().min(1),
        })
      )
      .min(1),
  }),
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
  }),
});

const UpdateQuestionsBulkSchema = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          learning_item_id: z.number().int().positive(),
          question_type: z.string().min(1).optional(),
          content: z.string().min(1).optional(),
        })
      )
      .min(1),
  }),
});

const QuestionIdParams = z.object({
  params: z.object({
    questionId: z.coerce.number().int().positive(),
  }),
});

const CreateAnswersBulkSchema = z.object({
  body: z.object({
    answers: z
      .array(
        z.object({
          content: z.string().min(1),
          is_correct: z.boolean(),
        })
      )
      .min(1),
  }),
  params: z.object({
    questionId: z.coerce.number().int().positive(),
  }),
});

const UpdateAnswersBulkSchema = z.object({
  body: z.object({
    answers: z
      .array(
        z.object({
          answer_id: z.number().int().positive(),
          content: z.string().min(1).optional(),
          is_correct: z.boolean().optional(),
        })
      )
      .min(1),
  }),
});

const AnswerIdParams = z.object({
  params: z.object({
    answerId: z.coerce.number().int().positive(),
  }),
});

const UpdateAnswerSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    is_correct: z.boolean(),
  }),
  params: z.object({
    answerId: z.coerce.number().int().positive(),
  }),
});

const UpdateQuestionSchema = z.object({
  body: z.object({
    question_type: z.string().min(1),
    content: z.string().min(1),
  }),
  params: z.object({
    questionId: z.coerce.number().int().positive(),
  }),
});

// ==================== Review Schemas ====================
const ReviewSectionParams = z.object({
  params: z.object({
    sectionId: z.coerce.number().int().positive(),
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
  SectionIdParamsWords,
  WordIdParams,
  CreateExampleSchema,
  UpdateExampleSchema,
  ExampleIdParams,
  CreateExamplesBulkSchema,
  UpdateExamplesBulkSchema,
  ReviewTopicParams,
  ReviewSectionParams,
  UpdateMasterySchema,
  CreateSectionsBulkSchema,
  UpdateSectionsBulkSchema,
  SectionIdParams,
  GetSectionSchema,
  CreateQuestionsBulkSchema,
  UpdateQuestionsBulkSchema,
  QuestionIdParams,
  UpdateQuestionSchema,
  CreateAnswersBulkSchema,
  UpdateAnswersBulkSchema,
  AnswerIdParams,
  UpdateAnswerSchema,
};
