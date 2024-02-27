import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const postSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "number" },
    userId: { type: "number" },
  },
};

export interface Post {
  id: number;
  title: string;
  description: string;
  category: number;
  userId: number;
}
const PostInput = {
  title: z.string(),
  description: z.string(),
  category: z.number(),
  userId: z.number(),
};
const createPostSchema = z.object({
  ...PostInput,
});
const postResponseSchema = z.object({
  ...PostInput,
  id: z.number(),
});
const postsResponseSchema = z.array(postResponseSchema);
export const { schemas, $ref } = buildJsonSchemas({
  createPostSchema,
  postResponseSchema,
  postsResponseSchema,
});
