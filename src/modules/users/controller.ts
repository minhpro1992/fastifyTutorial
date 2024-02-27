import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUserHandler, getUsersHandler } from "./handler";
import { $ref, userSchema } from "./schema";

function userController(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          //   200: $ref("usersResponseSchema"),
          200: {
            type: "array",
            items: userSchema,
          },
        },
      },
      preValidation: fastify.authenticate,
    },
    getUsersHandler
  );
  fastify.post(
    "/create",
    {
      schema: {
        // body: $ref("createUserSchema"),
        body: userSchema,
      },
    },
    createUserHandler
  );
  done();
}

export default userController;
