import { Request, Response } from "express";
import { isEmailValid } from "../../utils/email"; // Adjust the path as needed

import { createSubscriber } from "../../services/newsletter";

interface SignupPayLoad {
  email: string;
}

export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as SignupPayLoad;
    // console.log(email);
    // Add your signup logic
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const newSuscriber = await createSubscriber(email);
    console.log(newSuscriber, "signup success");
    return res.status(200).json(newSuscriber);
  } catch (error) {
    console.error(error); // Log the error to the console
    return res.status(500).json({ message: (error as Error).message });
  }
};
