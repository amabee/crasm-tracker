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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
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
      date_received_by_ro: application?.[index]?.dateReceivedByRo || "",
      ro_screener: application?.[index]?.RoScreener || "",
      date_forwarded_to_the_office_of_oic:
        application?.[index]?.dateForwardedToTheOfficeOfOIC || "",
      oic_crasd: application?.[index]?.OicCrasd || "",
      feedbacks: application?.[index]?.feedBacks || "",
      date_forwarded_to_ord: application?.[index]?.dateForwardedToORD || "",
      date_crasm_generated: application?.[index]?.dateCrasmGenerated || "",
      date_forwarded_back_to_the_office_of_oic_cao:
        application?.[index]?.dateForwardedBackToTheOfficeOfOicCao || "",
      date_transmitted_back_to_po:
        application?.[index]?.dateTransmittedBackToPO || "",
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
    setOpen(false);
    onRefetchData();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
          <DialogDescription>
            Update the application details for {application?.fullname}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date_received_by_ro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Received by RO</FormLabel>
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
                name="ro_screener"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RO Screener / SOIS Focal</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_forwarded_to_the_office_of_oic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Forwarded to OIC</FormLabel>
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
                name="oic_crasd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OIC CRASD</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feedbacks"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Feedbacks</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[100px]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_forwarded_to_ord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Forwarded to ORD</FormLabel>
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
                name="date_crasm_generated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date CRASM Generated</FormLabel>
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
                name="date_forwarded_back_to_the_office_of_oic_cao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Forwarded Back to OIC CAO</FormLabel>
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
                name="date_transmitted_back_to_po"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Transmitted Back to PO</FormLabel>
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
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Application"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationUpdateDialog;
