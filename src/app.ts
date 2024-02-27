import Fastify from "fastify";
import { customFastifyJWT } from "./modules/authenticate/controller";
import postController from "./modules/posts/controller";
import userController from "./modules/users/controller";
require("dotenv").config();
declare module "fastify" {
  export interface FastifyInstance {
    basisAuth: any;
    authenticate: any;
    jwt: any;
  }
}

const fastify = Fastify({
  logger: true,
});
const basicAuth = require("@fastify/basic-auth");
// Declare a route
fastify.register(userController, { prefix: "/users" });
fastify.register(postController, { prefix: "/posts" });
fastify.register(customFastifyJWT);
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Fastify tutorial",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
});
// const user: {
//   admin: string;
//   user: string;
// } = {
//   admin: "adminpassword",
//   user: "userpassword",
// };

// fastify.register(basicAuth, {
//   authenticate: async (username: string, password: string) => {
//     const userPassword: string = "adminpassword";
//     if (!userPassword || userPassword !== password) {
//       throw new Error("Authentication failed");
//     }
//   },
// });

// const logOnEvent =
//   (event: string) => async (request: FastifyInstance, reply: FastifyReply) => {
//     console.log(`Event ${event} : `);
//     fastify.basisAuth();
//     reply.send({ message: "Event onRequest" });
//   };
// fastify.after(() => {
//   // fastify.addHook("preHandler", fastify.basisAuth);
//   fastify.addHook("onRequest", logOnEvent("onRequest"));

//   // fastify.addHook("preParsing", logOnEvent("preParsing"));
// });

// Run the server!
async function main() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
