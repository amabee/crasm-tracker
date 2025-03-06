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
  import { useSession } from "next-auth/react";

  const ApplicationUpdateDialog = ({
    application,
    index,
    onUpdate,
    isUpdating,
    onRefetchData,
  }) => {
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();

    const form = useForm({
      defaultValues: {
        name_of_applicant: application?.[index]?.fullname || "",
        or_number: application?.[index]?.OrNumber || "",
        type_of_application: application?.[index]?.typeOfApplication || "",
        date_transmitted_to_ro: application?.[index]?.dateTransmittedToRo || "",
        provincial_office: application?.[index]?.province || "",
        date_received_by_po: application?.[index]?.dateTransmittedToRo || "",
        date_released_to_so: application?.[index]?.dateReleasedToSO || "",
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
              Update the application payment details for{" "}
              {application?.[index]?.fullname}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name_of_applicant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Applicant</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provincial_office"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincial Office</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_received_by_po_from_so_applicant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date Received by PO from the SO Applicant
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
                name="type_of_application"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Application</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_transmitted_to_ro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Transmitted to RO</FormLabel>
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
                name="date_received_by_po"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Received by PO</FormLabel>
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
                name="date_released_to_so"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Released to SO</FormLabel>
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
