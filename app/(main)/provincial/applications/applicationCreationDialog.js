import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";

const AddApplicationModal = ({ onAdd, isAdding, onRefetchData }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const form = useForm({
    defaultValues: {
      name_of_applicant: "",
      or_number: "",
      type_of_application: "",
      date_transmitted_to_ro: "",
      provincial_office: session?.user?.provinceId || "",
      date_received_by_po: "",
      date_released_to_so: "",
      date_received_by_po_from_so_applicant: "",
      remarks: "",
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

  const onSubmit = async (data) => {
    try {
      await onAdd(data);
      setOpen(false);
      form.reset();
      onRefetchData();
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  const applicationTypes = [
    "New Application",
    "Renewal",
    "Amendment",
    "Transfer",
    "Other",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="ml-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
            New Application
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name_of_applicant"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Applicant Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter applicant name"
                            {...field}
                            className="h-11 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type_of_application"
                    rules={{ required: "Application type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Application Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {applicationTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="provincial_office"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Provincial Office
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            className="h-11 bg-muted/50"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="date_received_by_po_from_so_applicant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Received from SO
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              value={formatDateForInput(field.value)}
                              className="h-11 pl-10 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20"
                            />
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date_transmitted_to_ro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Transmitted to RO
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              value={formatDateForInput(field.value)}
                              className="h-11 pl-10 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20"
                            />
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date_received_by_po"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Received by PO
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              value={formatDateForInput(field.value)}
                              className="h-11 pl-10 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20"
                            />
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date_released_to_so"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Released to SO
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              value={formatDateForInput(field.value)}
                              className="h-11 pl-10 rounded-md border-gray-200 focus:border-primary focus:ring-primary/20"
                            />
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Remarks Field - Full Width */}
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Remarks
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional remarks or notes"
                          className="min-h-[100px] rounded-md border-gray-200 focus:border-primary focus:ring-primary/20 resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 px-6 hover:bg-gray-50 border-gray-200 text-gray-700 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isAdding}
                  className="h-11 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Application"
                  )}
                </Button>
              </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationModal;