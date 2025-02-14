import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { userType, province } = await req.json();

    if ([4, 5].includes(Number(userType)) && !province) {
      return NextResponse.json(
        { error: "Province is required for this user type" },
        { status: 400 }
      );
    }

    const query = `
        UPDATE users 
        SET user_type_id = ?, province_id = ?
        WHERE user_id = ?
      `;

    const result = await executeQuery({
      query,
      values: [userType, province, userId],
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
