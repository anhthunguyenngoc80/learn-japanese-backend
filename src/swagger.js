const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
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
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        Collection: {
          type: "object",
          properties: {
            collection_id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            visibility: {
              type: "string",
              enum: ["public", "private"],
            },
            user_id: {
              type: "integer",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Topic: {
          type: "object",
          properties: {
            topic_id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            collection_id: {
              type: "integer",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Word: {
          type: "object",
          properties: {
            word_id: {
              type: "integer",
            },
            text: {
              type: "string",
              description: "Japanese word in kanji/kana",
            },
            sv_word: {
              type: "string",
              description: "Vietnamese word",
            },
            reading: {
              type: "string",
              description: "Reading in hiragana",
            },
            meaning: {
              type: "string",
              description: "English meaning",
            },
            part_of_speech: {
              type: "string",
            },
            topic_id: {
              type: "integer",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
        ReviewWord: {
          type: "object",
          properties: {
            word_id: {
              type: "integer",
            },
            text: {
              type: "string",
            },
            sv_word: {
              type: "string",
            },
            reading: {
              type: "string",
            },
            meaning: {
              type: "string",
            },
            part_of_speech: {
              type: "string",
            },
            recognition_level: {
              type: "integer",
            },
            listening_level: {
              type: "integer",
            },
            writing_level: {
              type: "integer",
            },
            next_review_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateCollectionInput: {
          type: "object",
          required: ["name", "visibility"],
          properties: {
            name: {
              type: "string",
              description: "Collection name",
            },
            visibility: {
              type: "string",
              enum: ["public", "private"],
              description: "Collection visibility",
            },
            topics: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
              description: "Optional topics to create with the collection",
            },
          },
        },
        CreateTopicInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "Topic name",
            },
          },
        },
        CreateWordInput: {
          type: "object",
          required: ["text", "sv_word", "reading", "meaning"],
          properties: {
            text: {
              type: "string",
              description: "Japanese word in kanji/kana",
            },
            sv_word: {
              type: "string",
              description: "Vietnamese word",
            },
            reading: {
              type: "string",
              description: "Reading in hiragana",
            },
            meaning: {
              type: "string",
              description: "English meaning",
            },
            part_of_speech: {
              type: "string",
              description: "Part of speech (e.g., noun, verb)",
            },
          },
        },
        CreateWordsBulkInput: {
          type: "object",
          required: ["words"],
          properties: {
            words: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CreateWordInput",
              },
            },
          },
        },
        UpdateMasteryInput: {
          type: "object",
          required: ["word_id", "skill", "is_correct", "response_time_ms"],
          properties: {
            word_id: {
              type: "integer",
              description: "Word ID",
            },
            skill: {
              type: "string",
              enum: ["recognition", "listening", "writing"],
              description: "Skill type to update",
            },
            is_correct: {
              type: "boolean",
              description: "Whether the answer was correct",
            },
            response_time_ms: {
              type: "integer",
              description: "Response time in milliseconds",
            },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;