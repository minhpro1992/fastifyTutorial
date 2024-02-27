import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createPostHandler, getPostsHandler } from "./handler";
import { $ref, postSchema } from "./schema";

function postController(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: postSchema,
          },
        },
      },
    },
    getPostsHandler
  );
  fastify.post(
    "/create",
    {
      schema: {
        body: postSchema,
      },
    },
    createPostHandler
  );
  done();
}

export default postController;
