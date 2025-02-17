import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM applications) as total_applications,
        (
          SELECT COUNT(*) 
          FROM applications 
          WHERE (
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
          )
        ) as pending_applications
    `;

    const monthlyQuery = `
      SELECT 
        MONTH(date_created) as month,
        COUNT(*) as total
      FROM applications
      WHERE YEAR(date_created) = YEAR(CURRENT_DATE())
      GROUP BY MONTH(date_created)
      ORDER BY month ASC
    `;

    const recentQuery = `
      SELECT 
        a.application_id,
        a.name_of_applicant,
        po.provincial_office as provincial_name,
        CASE 
          WHEN (
            a.date_received_by_po_from_so_applicant IS NULL OR
            a.date_of_payment IS NULL OR
            a.or_number IS NULL OR
            a.date_transmitted_to_ro IS NULL OR
            a.date_received_by_ro IS NULL OR
            a.ro_screener IS NULL OR
            a.date_forwarded_to_the_office_of_oic IS NULL OR
            a.oic_crasd IS NULL OR
            a.feedbacks IS NULL OR
            a.date_forwarded_to_ord IS NULL OR
            a.date_application_approved_by_rd IS NULL OR
            a.for_issuance_of_crasm IS NULL OR
            a.for_transmittal_of_crasm IS NULL OR
            a.date_crasm_generated IS NULL OR
            a.date_forwarded_back_to_the_office_of_oic_cao IS NULL OR
            a.date_reviewed_and_initialed_by_oic_crasd IS NULL OR
            a.date_forwarded_back_to_ord IS NULL OR
            a.date_transmitted_back_to_po IS NULL OR
            a.date_received_by_po IS NULL OR
            a.date_released_to_so IS NULL OR
            a.remarks IS NULL
          ) THEN 'In Progress'
          ELSE 'Complete'
        END AS status,
        a.date_created
      FROM applications a
      LEFT JOIN provincial_office po ON a.provincial_office = po.province_id
      ORDER BY a.date_created DESC
      LIMIT 10
    `;

    const [statsResults, monthlyResults, recentResults] = await Promise.all([
      executeQuery({ query: statsQuery }),
      executeQuery({ query: monthlyQuery }),
      executeQuery({ query: recentQuery }),
    ]);

    if (statsResults.error || monthlyResults.error || recentResults.error) {
      return NextResponse.json(
        { error: "Error fetching dashboard data" },
        { status: 500 }
      );
    }

    const dashboardData = {
      ...statsResults[0],
      monthly_applications: monthlyResults,
      recent_applications: recentResults,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
