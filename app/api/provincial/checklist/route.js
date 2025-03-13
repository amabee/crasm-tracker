import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("application_id");

    if (!applicationId) {
      return NextResponse.json(
        { error: "application_id is required" },
        { status: 400 }
      );
    }

    const checklistItemsQuery = `
        SELECT checklist_id, item_name 
        FROM checklist_items
        ORDER BY checklist_id
      `;

    const checklistItems = await executeQuery({
      query: checklistItemsQuery,
      values: [],
    });

    if (checklistItems.error) {
      return NextResponse.json(
        { error: "Error fetching checklist items" },
        { status: 500 }
      );
    }

    const applicantChecklistQuery = `
        SELECT checklist_id, application_id, completeness_check, remarks
        FROM applicant_checklist
        WHERE application_id = ?
      `;

    const applicantChecklist = await executeQuery({
      query: applicantChecklistQuery,
      values: [applicationId],
    });

    if (applicantChecklist.error) {
      return NextResponse.json(
        { error: "Error fetching applicant checklist" },
        { status: 500 }
      );
    }

    const checklistMap = {};
    applicantChecklist.forEach((item) => {
      checklistMap[item.checklist_id] = {
        isChecked: item.completeness_check === 1,
        remarks: item.remarks,
      };
    });

    const combinedResults = checklistItems.map((item) => ({
      checklist_id: item.checklist_id,
      item_name: item.item_name,
      isChecked: checklistMap[item.checklist_id]?.isChecked || false,
      remarks: checklistMap[item.checklist_id]?.remarks || "",
    }));

    return NextResponse.json(combinedResults);
  } catch (error) {
    console.error("Error in GET checklist items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { application_id, checklist_id, completeness_check, remarks } = body;

    if (!application_id || checklist_id === undefined) {
      return NextResponse.json(
        { error: "application_id and checklist_id are required" },
        { status: 400 }
      );
    }

    const checkExisting = await executeQuery({
      query: `
        SELECT id FROM applicant_checklist 
        WHERE application_id = ? AND checklist_id = ?
      `,
      values: [application_id, checklist_id],
    });

    let result;

    if (checkExisting.length > 0) {
      result = await executeQuery({
        query: `
          UPDATE applicant_checklist 
          SET completeness_check = ?, remarks = ? 
          WHERE application_id = ? AND checklist_id = ?
        `,
        values: [
          completeness_check,
          remarks || "",
          application_id,
          checklist_id,
        ],
      });
    } else {
      result = await executeQuery({
        query: `
          INSERT INTO applicant_checklist 
          (application_id, checklist_id, completeness_check, remarks) 
          VALUES (?, ?, ?, ?)
        `,
        values: [
          application_id,
          checklist_id,
          completeness_check,
          remarks || "",
        ],
      });
    }

    if (result.error) {
      return NextResponse.json(
        { error: "Error updating checklist item" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PATCH checklist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
