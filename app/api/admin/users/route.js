import { executeQuery } from "@/lib/db";
import {
  generateCredentials,
  generateRandomString,
  hashPassword,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `
     SELECT 
        u.user_id,
        u.full_name,
        u.email,
        u.is_active,
        ut.user_type_name as user_type,
        p.provincial_office as province
      FROM users u
      LEFT JOIN usertypes ut ON u.user_type_id = ut.user_type_id
      LEFT JOIN provincial_office p ON u.province_id = p.province_id
    `;

    const results = await executeQuery({ query });

    if (results.error) {
      return NextResponse.json(
        { error: "Error fetching users" },
        { status: 500 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in GET /api/admin/users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { fullName, email, userType, province } = await req.json();

    if (!fullName || !email || !userType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (userType == 4 || userType == 5) {
      if (!province) {
        return NextResponse.json(
          { error: "Province is required for this user type" },
          { status: 400 }
        );
      }
    }

    const { username, password } = generateCredentials(fullName);
    const hashedPassword = await hashPassword(password);

    const query = `
      INSERT INTO users (full_name, email, user_type_id, province_id, username, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await executeQuery({
      query,
      values: [fullName, email, userType, province, username, hashedPassword],
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertId,
        credentials: { username, password },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/admin/users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
