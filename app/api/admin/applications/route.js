import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
      ORDER BY applications.date_created DESC
    `;

    const results = await executeQuery({ query });

    if (results.error) {
      return NextResponse.json(
        { error: "Error fetching applications" },
        { status: 500 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
