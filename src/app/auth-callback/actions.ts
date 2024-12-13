"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
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
          email: user.email,
          name: user.given_name
            ? `${user.given_name} ${user.family_name || ""}`.trim()
            : undefined,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error in getAuthStatus:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
