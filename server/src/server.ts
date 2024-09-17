import express, { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health";
import { createNewsletterRouter } from "./routes/newsletter";
import cors from "cors";
const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let server: Express | null = null;

export const createServer = (): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(
    cors({
      origin: "http://localhost:3001",
    })
  );
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/v1", createHealthRouter());
  server.use("/v1", createNewsletterRouter());
  server.use((req, res, next) => {
    next(new Error("Not found"));
  });

  server.use(errorHandler);

  return server;
};
