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
      oic_crasd: application?.[index]?.OicCrasd || "",
      date_reviewed_and_initialed_by_oic_crasd:
        application?.[index]?.dateReviewedAndInitialedByOICCrasd || "",
      date_forwarded_back_to_ord:
        application?.[index]?.dateForwardedBackToOrd || "",
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
              name="date_reviewed_and_initialed_by_oic_crasd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Reviewed & Initialed by OIC-CRASD</FormLabel>
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
              name="date_forwarded_back_to_ord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Forwarded Back to ORD</FormLabel>
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
