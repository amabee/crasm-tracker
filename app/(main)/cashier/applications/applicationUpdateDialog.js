"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, Loader2 } from "lucide-react";
import { format } from "date-fns";

const ApplicationUpdateDialog = ({
  application,
  index,
  onUpdate,
  isUpdating,
  onRefetchData,
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      date_application_approved_by_rd:
        application?.[index]?.dateApplicationApprovedByRD || "",
      for_issuance_of_crasm: application?.[index]?.forIssuanceOfCrasm || "",
      for_transmittal_of_crasm:
        application?.[index]?.forTransmittalOfCrasm || "",
      date_crasm_approved_by_rd:
        application?.[index]?.dateCrasmApprovedByRD || "",
    },
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch {
      return "";
    }
  };

  const onSubmit = (data) => {
    onUpdate({ id: application?.[index]?.id, data });
    //setOpen(false);
    onRefetchData();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
          <DialogDescription>
            Update the application details for {application?.fullname}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date_application_approved_by_rd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date Application Approved by Regional Director
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={formatDateForInput(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="for_issuance_of_crasm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>for Issuance of CRASM</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={formatDateForInput(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="for_transmittal_of_crasm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>for Transmittal of CRASM</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={formatDateForInput(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_crasm_approved_by_rd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date CRASM Approved by Regional Director
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={formatDateForInput(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationUpdateDialog;
