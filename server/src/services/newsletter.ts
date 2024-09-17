import { createRandomToken } from "../utils/token";
import { prisma } from "../../prisma/client"; // Adjust the path as needed
export const createSubscriber = async (email: string) => {
  try {
    const newSubscriber = await prisma.newsLetterSubscriber.upsert({
      create: {
        email,
        token: createRandomToken(),
        confirmed: false,
        active: false,
      },
      update: {
        confirmed: false,
        active: false,
        token: createRandomToken(),
      },
      where: { email },
    });
    return newSubscriber;
  } catch (error) {
    throw new Error("Error creating subscriber");
  }
};

export const getSubscriberByEmail = async (email: string) => {
  try {
    const subscriber = await prisma.newsLetterSubscriber.findUnique({
      where: { email },
    });
    return subscriber;
  } catch (error) {
    throw new Error("Error fetching subscriber");
  }
};
