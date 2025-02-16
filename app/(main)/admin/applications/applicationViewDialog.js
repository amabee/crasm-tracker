"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, readableDate } from "@/lib/utils";
import { useApplication } from "@/hooks/useApplications";
import { Card } from "@/components/ui/card";

const ApplicationViewDialog = ({ applicationId }) => {
  const { applicationDetail, isDetailLoading, refetchApplicationsDetails } =
    useApplication(applicationId);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open) {
      refetchApplicationsDetails?.();
    }
  }, [open]);

  const getStatusColor = (status) => {
    return status === "Complete"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-200 text-yellow-900";
  };

  const timelineData = applicationDetail
    ? [
        {
          process: "Applicant Name",
          value: applicationDetail.name_of_applicant,
        },
        {
          process: "Provincial Office",
          value: applicationDetail.provincial_name,
        },
        {
          process: "Date Received by PO from SO/Applicant",
          value: readableDate(
            applicationDetail.date_received_by_po_from_so_applicant
          ),
        },
        {
          process: "Type of Application",
          value: applicationDetail.type_of_application,
        },
        {
          process: "Date of Payment",
          value: readableDate(applicationDetail.date_of_payment),
        },
        {
          process: "OR Number",
          value: applicationDetail.or_number,
        },
        {
          process: "Date Transmitted to RO",
          value: readableDate(applicationDetail.date_transmitted_to_ro),
        },
        {
          process: "Date Received by RO",
          value: readableDate(applicationDetail.date_received_by_ro),
        },
        {
          process: "RO Screener / SOIS Focal",
          value: applicationDetail.ro_screener,
        },
        {
          process: "Date Forwarded to the Office of OIC / CAO",
          value: readableDate(
            applicationDetail.date_forwarded_to_the_office_of_oic
          ),
        },
        {
          process: "OIC CRASD",
          value: applicationDetail.oic_crasd,
        },
        {
          process: "Feedbacks",
          value: applicationDetail.feedbacks,
        },
        {
          process: "Date Forwarded to ORD",
          value: readableDate(applicationDetail.date_forwarded_to_ord),
        },
        {
          process: "Date Application Approved by Regional Director",
          value: readableDate(
            applicationDetail.date_application_approved_by_rd
          ),
        },
        {
          process: "For Issuance of CRASM",
          value: applicationDetail.for_issuance_of_crasm,
        },
        {
          process: "For Transmittal of CRASM",
          value: applicationDetail.for_transmittal_of_crasm,
        },
        {
          process: "Date CRASM Generated",
          value: readableDate(applicationDetail.date_crasm_generated),
        },
        {
          process: "Date Forwarded Back to the Office of OIC CAO",
          value: readableDate(
            applicationDetail.date_forwarded_back_to_the_office_of_oic_cao
          ),
        },
        {
          process: "Date Reviewed and Initialed by OIC CRASD",
          value: readableDate(
            applicationDetail.date_reviewed_and_initialed_by_oic_crasd
          ),
        },
        {
          process: "Date Forwarded Back to ORD",
          value: readableDate(applicationDetail.date_forwarded_back_to_ord),
        },
        {
          process: "Date CRASM Approved by Regional Director",
          value: readableDate(applicationDetail.date_crasm_approved_by_rd),
        },
        {
          process: "Transmitted Back to PO",
          value: readableDate(applicationDetail.date_transmitted_back_to_po),
        },
        {
          process: "Received by PO",
          value: readableDate(applicationDetail.date_received_by_po),
        },
        {
          process: "Released to SO",
          value: readableDate(applicationDetail.date_released_to_so),
        },
        {
          process: "Remarks",
          value: applicationDetail.remarks,
        },
        {
          process: "Date Created",
          value: formatDateTime(applicationDetail.date_created),
        },
        {
          process: "Last Updated",
          value: formatDateTime(applicationDetail.last_updated),
        },
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-50 transition-colors"
        >
          <Eye className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between pb-2">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Application Details
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Complete application information and timeline
              </DialogDescription>
            </div>
            {applicationDetail && (
              <Badge
                className={`${getStatusColor(applicationDetail.status)} 
            text-md font-sm px-4 py-1 rounded-full border shadow-sm pointer-events-none`}
              >
                {applicationDetail.status}
              </Badge>
            )}
          </div>
        </DialogHeader>
        <Separator className="my-4" />
        {isDetailLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" />
          </div>
        ) : (
          <ScrollArea className="h-full pr-4">
            <Card className="p-6 shadow-sm border-gray-100">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="w-1/2 text-blue-800">
                      Process
                    </TableHead>
                    <TableHead className="w-1/2 text-blue-800">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timelineData.map((item, index) => (
                    <TableRow
                      key={index}
                      className={`
                            group hover:bg-blue-50/50 transition-colors
                            ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
                          `}
                    >
                      <TableCell className="w-8 text-center">
                        <span className="text-lg">{item.icon}</span>
                      </TableCell>
                      <TableCell className="font-medium text-gray-700">
                        {item.process}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {item.value || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationViewDialog;
