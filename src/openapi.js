const { OpenAPIRegistry, OpenApiGeneratorV3 } = require("@asteasolutions/zod-to-openapi");
const { z } = require("zod");

const registry = new OpenAPIRegistry();

// ==================== Reusable Components ====================

// Error response
registry.registerComponent("schemas", "Error", z.object({
  message: z.string(),
}));

// ==================== Auth Routes ====================
registry.registerPath({
  method: "post",
  path: "/register",
  summary: "Register a new user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            username: z.string().min(1).max(50),
            email: z.string().email(),
            password: z.string().min(6),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              user_id: z.number(),
              username: z.string(),
              email: z.string(),
              token: z.string(),
            }),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().email(),
            password: z.string().min(1),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              user_id: z.number(),
              username: z.string(),
              email: z.string(),
              token: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Invalid credentials",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/me",
  summary: "Get current user info",
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User info retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              user_id: z.number(),
              username: z.string(),
              email: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

// ==================== Collection Routes ====================
registry.registerPath({
  method: "post",
  path: "/collections",
  summary: "Create a new collection",
  tags: ["Collections"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().min(1).max(100),
            visibility: z.enum(["public", "private"]),
            topics: z.array(z.object({
              name: z.string().min(1).max(100),
            })).optional().default([]),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Collection created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              collection_id: z.number(),
              name: z.string(),
              visibility: z.string(),
              user_id: z.number(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/collections",
  summary: "Get all collections for current user",
  tags: ["Collections"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "Collections retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              collection_id: z.number(),
              name: z.string(),
              visibility: z.string(),
              user_id: z.number(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/collections/{collectionId}",
  summary: "Get collection by ID",
  tags: ["Collections"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      collectionId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Collection retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              collection_id: z.number(),
              name: z.string(),
              visibility: z.string(),
              user_id: z.number(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    404: {
      description: "Collection not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/collections/{collectionId}",
  summary: "Delete a collection",
  tags: ["Collections"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      collectionId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Collection deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: "Collection not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

// ==================== Topic Routes ====================
registry.registerPath({
  method: "post",
  path: "/collections/{collectionId}/topics",
  summary: "Create a new topic in a collection",
  tags: ["Topics"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      collectionId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().min(1).max(100),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Topic created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              topic_id: z.number(),
              name: z.string(),
              collection_id: z.number(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/collections/{collectionId}/topics",
  summary: "Get all topics in a collection",
  tags: ["Topics"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      collectionId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Topics retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              topic_id: z.number(),
              name: z.string(),
              collection_id: z.number(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/topics/{topicId}",
  summary: "Get topic by ID with optional word limit",
  tags: ["Topics"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
    query: z.object({
      limit: z.coerce.number().int().positive().optional(),
    }),
  },
  responses: {
    200: {
      description: "Topic retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              topic_id: z.number(),
              name: z.string(),
              collection_id: z.number(),
              words: z.array(z.object({
                word_id: z.number(),
                text: z.string(),
                sv_word: z.string(),
                reading: z.string(),
                meaning: z.string(),
                part_of_speech: z.string().optional(),
              })),
            }),
          }),
        },
      },
    },
    404: {
      description: "Topic not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

// ==================== Word Routes ====================
registry.registerPath({
  method: "post",
  path: "/words/{topicId}",
  summary: "Create a new word in a topic",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            text: z.string().min(1),
            sv_word: z.string().min(1),
            reading: z.string().min(1),
            meaning: z.string().min(1),
            part_of_speech: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Word created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              topic_id: z.number(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/words/{topicId}/bulk",
  summary: "Create multiple words in a topic",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            words: z.array(z.object({
              text: z.string().min(1),
              sv_word: z.string().min(1),
              reading: z.string().min(1),
              meaning: z.string().min(1),
              part_of_speech: z.string().optional(),
            })).min(1),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Words created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              topic_id: z.number(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/words/{topicId}",
  summary: "Get all words in a topic for current user",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Words retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              topic_id: z.number(),
              recognition_level: z.number().optional(),
              listening_level: z.number().optional(),
              writing_level: z.number().optional(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/words/{wordId}",
  summary: "Get a word by ID",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      wordId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Word retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              topic_id: z.number(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/words/{wordId}",
  summary: "Delete a word by ID",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      wordId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Word deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              word_id: z.number(),
              topic_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    404: {
      description: "Word not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/words/bulk",
  summary: "Update multiple words",
  tags: ["Words"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            words: z.array(z.object({
              word_id: z.number().int().positive(),
              text: z.string().min(1).optional(),
              sv_word: z.string().min(1).optional(),
              reading: z.string().min(1).optional(),
              meaning: z.string().min(1).optional(),
              part_of_speech: z.string().optional(),
            })).min(1),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Words updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              topic_id: z.number(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

// ==================== Example Routes ====================
registry.registerComponent("schemas", "Example", z.object({
  example_id: z.number(),
  word_id: z.number(),
  content: z.string(),
  meaning: z.string(),
  created_at: z.string(),
}));

registry.registerPath({
  method: "post",
  path: "/words/{wordId}/examples",
  summary: "Create a new example for a word",
  tags: ["Examples"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      wordId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string().min(1),
            meaning: z.string().min(1),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Example created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              example_id: z.number(),
              word_id: z.number(),
              content: z.string(),
              meaning: z.string(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/words/{wordId}/examples/bulk",
  summary: "Create multiple examples for a word",
  tags: ["Examples"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      wordId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            examples: z.array(z.object({
              content: z.string().min(1),
              meaning: z.string().min(1),
            })).min(1),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Examples created successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              example_id: z.number(),
              word_id: z.number(),
              content: z.string(),
              meaning: z.string(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/examples/{exampleId}",
  summary: "Update an example",
  tags: ["Examples"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      exampleId: z.coerce.number().int().positive(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string().min(1),
            meaning: z.string().min(1),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Example updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              example_id: z.number(),
              word_id: z.number(),
              content: z.string(),
              meaning: z.string(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    404: {
      description: "Example not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/examples/bulk",
  summary: "Update multiple examples",
  tags: ["Examples"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            examples: z.array(z.object({
              example_id: z.number().int().positive(),
              content: z.string().min(1).optional(),
              meaning: z.string().min(1).optional(),
            })).min(1),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Examples updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              example_id: z.number(),
              word_id: z.number(),
              content: z.string(),
              meaning: z.string(),
              created_at: z.string(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/examples/{exampleId}",
  summary: "Delete an example",
  tags: ["Examples"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      exampleId: z.coerce.number().int().positive(),
    }),
  },
  responses: {
    200: {
      description: "Example deleted successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              example_id: z.number(),
              word_id: z.number(),
              content: z.string(),
              meaning: z.string(),
              created_at: z.string(),
            }),
          }),
        },
      },
    },
    404: {
      description: "Example not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

// ==================== Review Routes ====================
registry.registerPath({
  method: "get",
  path: "/review/flashcard/{topicId}",
  summary: "Get flashcards for a topic",
  tags: ["Review"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
    query: z.object({
      limit: z.coerce.number().int().positive().optional().default(10),
    }),
  },
  responses: {
    200: {
      description: "Flashcards retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              recognition_level: z.number(),
              listening_level: z.number(),
              writing_level: z.number(),
              next_review_at: z.string().nullable(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/review/practice/{topicId}",
  summary: "Get words due for review practice",
  tags: ["Review"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      topicId: z.coerce.number().int().positive(),
    }),
    query: z.object({
      limit: z.coerce.number().int().positive().optional().default(10),
    }),
  },
  responses: {
    200: {
      description: "Words due for review retrieved successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.array(z.object({
              word_id: z.number(),
              text: z.string(),
              sv_word: z.string(),
              reading: z.string(),
              meaning: z.string(),
              part_of_speech: z.string().optional(),
              recognition_level: z.number(),
              listening_level: z.number(),
              writing_level: z.number(),
              next_review_at: z.string().nullable(),
            })),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

registry.registerPath({
  method: "put",
  path: "/review/update-mastery",
  summary: "Update word mastery after an attempt",
  tags: ["Review"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            word_id: z.number().int().positive(),
            skill: z.enum(["recognition", "listening", "writing"]),
            is_correct: z.boolean(),
            response_time_ms: z.number().int().nonnegative(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Mastery updated successfully",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: z.object({
              word_id: z.number(),
              skill: z.string(),
              new_level: z.number(),
              next_review_at: z.string(),
            }),
          }),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" },
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

module.exports = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Learn Japanese API",
    version: "1.0.0",
    description: "API documentation for Learn Japanese application",
  },
  servers: [
    {
      url: "/api",
      description: "API server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
});