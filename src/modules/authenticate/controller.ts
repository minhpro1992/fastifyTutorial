import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { authenticateHandler } from "./handler";
import { loadEnvironmentVariable } from "../../utils/environment";
const fastifyJwt = require("@fastify/jwt");
import fp from "fastify-plugin";

async function customFastifyJWT(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: any
) {
  fastify.register(fastifyJwt, {
    secret: loadEnvironmentVariable("JWT_SECRET"),
  });
  fastify.decorate("authenticate", authenticateHandler);
  fastify.get("/signup", (request: FastifyRequest, reply: FastifyReply) => {
    const token = fastify.jwt.sign({ test: "123456" });
    request.jwt = token;
    reply.send({ token });
  });

  // fastify.addHook("onRequest", fastify.authenticate);
  // fastify.addHook("preHandler", (req: FastifyRequest, _, next: any) => {
  //   req.jwt = fastify.jwt;
  //   return next();
  // });
  fastify.get(
    "/protected",
    { preValidation: fastify.authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Check if the Authorization header exists
        if (!request.headers.authorization) {
          throw new Error("Authorization header is missing");
        }

        // If JWT authentication succeeds, request.user will contain the decoded JWT payload
        return { user: request.user };
      } catch (error) {
        reply
          .status(401)
          .send({ error: "Authentication failed", message: error.message });
      }
    }
  );
}

export { customFastifyJWT };
