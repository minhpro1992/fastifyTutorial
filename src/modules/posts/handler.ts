import { FastifyReply, FastifyRequest } from "fastify";
import { Post } from "./schema";

async function getPostsHandler(request: FastifyRequest, reply: FastifyReply) {
  const posts: Post[] = [
    {
      id: 1,
      title: "post 1",
      description: "description post 1",
      category: 1,
      userId: 1,
    },
  ];
  reply.code(201).send({ data: posts, message: "Get posts successfully" });
}

async function createPostHandler(request: FastifyRequest, reply: FastifyReply) {
  const { body } = request;
  console.log(body);
  reply.code(201).send({ message: "Create Post successfully" });
}

export { getPostsHandler, createPostHandler };
