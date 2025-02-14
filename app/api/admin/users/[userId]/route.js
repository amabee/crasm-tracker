import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { userType } = await req.json();

    const query = `
      UPDATE users 
      SET user_type_id = ?
      WHERE user_id = ?
    `;

    const result = await executeQuery({
      query,
      values: [userType, userId],
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Error updating user role" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error in PATCH /api/admin/users/[userId]/role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = params;

    const query = `
      DELETE FROM users 
      WHERE user_id = ?
    `;

    const result = await executeQuery({
      query,
      values: [userId],
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Error deleting user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/users/[userId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
