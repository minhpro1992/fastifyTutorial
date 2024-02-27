import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./schema";

async function getUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  console.log("getUsersHandler: ", request.headers);

  const users: User[] = [
    {
      id: 1,
      username: "User 1",
      password: "Password 1",
      email: "Email1@test.com",
    },
  ];
  reply.code(201).send({ message: "Get users successfully", data: users });
}

async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { body } = request;
  console.log(body);
  reply.code(201).send({ message: "Create user successfully" });
}

export { getUsersHandler, createUserHandler };
