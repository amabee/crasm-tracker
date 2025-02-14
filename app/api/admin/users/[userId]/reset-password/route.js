import { executeQuery } from "@/lib/db";
import { generateRandomString, hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = await params;

    const specialChars = "!@#$%^&*";
    const randomChar =
      specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomDigit = Math.floor(Math.random() * 10);
    const basePassword = generateRandomString(10)
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 10);
    const newPassword = basePassword + randomDigit + randomChar;

    const hashedPassword = await hashPassword(newPassword);

    const query = `
      UPDATE users 
      SET password = ?
      WHERE user_id = ?
    `;

    const result = await executeQuery({
      query,
      values: [hashedPassword, userId],
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Error resetting password" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Password reset successfully",
      newPassword,
      hashedPassword,
    });
  } catch (error) {
    console.error(
      "Error in POST /api/admin/users/[userId]/reset-password:",
      error
    );
    return NextResponse.json(
      { error: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}
