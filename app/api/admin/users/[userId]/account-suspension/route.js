import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = await params;
    const { isActive } = await req.json();

    const query = `
        UPDATE users 
        SET is_active = ?
        WHERE user_id = ?
      `;

    const result = await executeQuery({
      query,
      values: [isActive, userId],
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Error updating user active status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User active status updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
