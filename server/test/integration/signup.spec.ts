import request from "supertest";
import HttpStatus from "http-status";
import { createServer } from "../../src/server";
import { PrismaClient } from "@prisma/client";
// import { describe, it, afterAll, before, beforeEach } from "jest";

describe("signup", () => {
  const prisma = new PrismaClient();
  const server = createServer().listen(80);

  afterAll(async () => {
    server.close();
    //after create delete database

    await prisma.newsLetterSubscriber.deleteMany();
    await prisma.$disconnect();
  });
  beforeEach(async () => {
    await prisma.newsLetterSubscriber.deleteMany();
  });
  it("should throw 400 if not sent an email", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send()
      //   .expect("ok")
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("should throw 200 if not sent an email", async () => {
    await request(server)
      .post("/v1/newsletter/signup")
      .send({ email: "banda@gmail.com" })
      .expect("content-type", /json/)
      .expect(HttpStatus.OK);
  });
});
