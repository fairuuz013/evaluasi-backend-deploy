import swaggerJSDoc from "swagger-jsdoc";


export const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Perpustakaan",
      version: "1.0.0",
      description: "Dokumentasi API Evaluasi Backend Perpustakaan",
    },
    servers: [
      {
        url: "http://localhost:5002/api ",
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
    security: [{ bearerAuth: [] }],
  },

  // 🔥 ini penting
  apis: ["./src/routes/*.ts"],
};
