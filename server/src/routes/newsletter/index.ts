import express from "express";
import { signUpHandler } from "./signUp";
export const createNewsletterRouter = () => {
  const router = express.Router();
  router.post("/newsletter/signup", signUpHandler);

  return router;
};
