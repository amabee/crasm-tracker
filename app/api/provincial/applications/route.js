import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provinceId = searchParams.get("province_id");

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
        END AS status,
        CASE
          WHEN date_received_by_po_from_so_applicant IS NULL THEN 'Awaiting PO Receipt Date from SOIS/Applicant'
          WHEN date_of_payment IS NULL THEN 'Awaiting Payment'
          WHEN or_number IS NULL THEN 'Awaiting OR Number'
          WHEN date_transmitted_to_ro IS NULL THEN 'Awaiting Transmission to RO'
          WHEN date_received_by_ro IS NULL THEN 'Awaiting RO Receipt'
          WHEN ro_screener IS NULL THEN 'Awaiting RO Screener'
          WHEN date_forwarded_to_the_office_of_oic IS NULL THEN 'Awaiting Forward to OIC'
          WHEN oic_crasd IS NULL THEN 'Awaiting OIC CRASD'
          WHEN feedbacks IS NULL THEN 'Awaiting Feedbacks'
          WHEN date_forwarded_to_ord IS NULL THEN 'Awaiting Forward to ORD'
          WHEN date_application_approved_by_rd IS NULL THEN 'Awaiting RD Approval'
          WHEN for_issuance_of_crasm IS NULL THEN 'Awaiting CRASM Issuance'
          WHEN for_transmittal_of_crasm IS NULL THEN 'Awaiting CRASM Transmittal'
          WHEN date_crasm_generated IS NULL THEN 'Awaiting CRASM Generation'
          WHEN date_forwarded_back_to_the_office_of_oic_cao IS NULL THEN 'Awaiting Forward to OIC CAO'
          WHEN date_reviewed_and_initialed_by_oic_crasd IS NULL THEN 'Awaiting OIC CRASD Review'
          WHEN date_forwarded_back_to_ord IS NULL THEN 'Awaiting Forward to ORD'
          WHEN date_transmitted_back_to_po IS NULL THEN 'Awaiting Transmission to PO'
          WHEN date_received_by_po IS NULL THEN 'Awaiting PO Receipt'
          WHEN date_released_to_so IS NULL THEN 'Awaiting Release to SO'
          WHEN remarks IS NULL THEN 'Awaiting Remarks'
          ELSE 'Complete'
        END AS awaiting_process
      FROM applications 
      LEFT JOIN provincial_office ON applications.provincial_office = provincial_office.province_id
      WHERE applications.provincial_office = ?
      ORDER BY applications.date_created DESC
    `;

    const queryParams = provinceId ? [provinceId] : [];
    const results = await executeQuery({
      query,
      values: queryParams,
    });

    if (results.error) {
      return NextResponse.json(
        { error: "Error fetching applications" },
        { status: 500 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in GET applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
