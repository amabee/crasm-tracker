import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const [provinces, userTypes] = await Promise.all([
      executeQuery({
        query: "SELECT * FROM provincial_office ORDER BY provincial_office",
      }),
      executeQuery({
        query: "SELECT * FROM usertypes ORDER BY user_type_id",
      }),
    ]);

    return NextResponse.json({
      provinces: provinces.map((p) => ({
        id: p.province_id,
        name: p.provincial_office,
      })),
      userTypes: userTypes.map((t) => ({
        id: t.user_type_id,
        name: t.user_type_name,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lookup data" },
      { status: 500 }
    );
  }
}