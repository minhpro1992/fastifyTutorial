import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userInput = {
  id: z.number(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
};
const userGenerated = {
  id: z.number(),
};
const userResponseSchema = z.object({
  ...userInput,
  ...userGenerated,
});
const createUserSchema = z.object({
  ...userInput,
});
const usersResponseSchema = z.array(userResponseSchema);
export const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    password: { type: "string" },
    email: { type: "string", format: "email" },
  },
} as const;

// export type userSchema = z.infer<typeof User>;
export const { schemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    userResponseSchema,
    usersResponseSchema,
  },
  { $id: "userSchema", errorMessages: true }
);

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}
