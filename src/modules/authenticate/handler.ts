import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    jwtVerify: any;
    jwt: string;
    user: Record<string, string>;
  }
}

const authenticateHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.headers.authorization;
    console.log("Token: ", request.headers);

    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};

export { authenticateHandler };
