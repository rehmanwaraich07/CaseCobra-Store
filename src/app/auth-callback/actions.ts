"use server";

import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAuthStatus = async () => {
  try {
    const user = await currentUser();

    if (!user?.id || !user.emailAddresses[0].emailAddress) {
      console.error("Invalid user data:", user);
      return { success: false, error: "Invalid user data" };
    }

    const existingUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error in getAuthStatus:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
