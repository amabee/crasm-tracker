import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export async function GET(request, { params }) {
  try {
    const { applicationId } = await params;

    const query = `
      SELECT 
        applications.*,
        provincial_office.provincial_office AS provincial_name,
        CASE 
          WHEN (
            date_received_by_po_from_so_applicant IS NULL OR
            date_of_payment IS NULL OR
            or_number IS NULL OR
            date_transmitted_to_ro IS NULL OR
            date_received_by_ro IS NULL OR
            ro_screener IS NULL OR
            date_forwarded_to_the_office_of_oic IS NULL OR
            oic_crasd IS NULL OR
            feedbacks IS NULL OR
            date_forwarded_to_ord IS NULL OR
            date_application_approved_by_rd IS NULL OR
            for_issuance_of_crasm IS NULL OR
            for_transmittal_of_crasm IS NULL OR
            date_crasm_generated IS NULL OR
            date_forwarded_back_to_the_office_of_oic_cao IS NULL OR
            date_reviewed_and_initialed_by_oic_crasd IS NULL OR
            date_forwarded_back_to_ord IS NULL OR
            date_transmitted_back_to_po IS NULL OR
            date_received_by_po IS NULL OR
            date_released_to_so IS NULL OR
            remarks IS NULL
          ) THEN 'In Progress'
          ELSE 'Complete'
        END AS status
      FROM applications 
      LEFT JOIN provincial_office ON applications.provincial_office = provincial_office.province_id
      WHERE application_id = ?
    `;

    const results = await executeQuery({
      query,
      values: [applicationId],
    });

    if (!results || results.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (results.error) {
      console.error("Database error:", results.error);
      return NextResponse.json(
        { error: "Error fetching application" },
        { status: 500 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { applicationId } = await params;
    const body = await request.json();

    const allowedFields = [
      "name_of_applicant",
      "date_received_by_po_from_so_applicant",
      "type_of_application",
      "date_transmitted_to_ro",
      "date_received_by_po",
      "date_released_to_so",
    ];

    const updates = Object.entries(body)
      .filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined
      )
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const philippineTime = DateTime.now().setZone("Asia/Manila").toISO();
    updates.last_updated = philippineTime;

    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");

    const query = `
      UPDATE applications 
      SET ${setClause}
      WHERE application_id = ?
    `;

    const values = [...Object.values(updates), applicationId];

    const result = await executeQuery({
      query,
      values,
    });

    if (result.error) {
      console.error("Database error:", result.error);
      return NextResponse.json(
        { error: "Error updating application" },
        { status: 500 }
      );
    }

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application updated successfully",
      updatedFields: Object.keys(updates),
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
