// components/CreateUserDialog.js
import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "",
    province: "",
  });

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      userType: "",
      province: "",
    });
    setOpen(false);
  };

  const { lookupData, isError, isLoading, createUser, isCreating } =
    useUser(resetForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
  };

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading form data. Please try again later.
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to the system. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="focus-visible:ring-2 focus-visible:ring-offset-1"
                required
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="focus-visible:ring-2 focus-visible:ring-offset-1"
                required
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="userType">User Type</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) =>
                  setFormData({ ...formData, userType: value })
                }
                required
                disabled={isLoading}
              >
                <SelectTrigger id="userType" className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  {lookupData?.userTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="province">Province</Label>
              <Select
                value={formData.province}
                onValueChange={(value) =>
                  setFormData({ ...formData, province: value })
                }
                required
                disabled={isLoading}
              >
                <SelectTrigger id="province" className="w-full">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {lookupData?.provinces.map((province) => (
                    <SelectItem
                      key={province.id}
                      value={province.id.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              disabled={isLoading || isCreating}
            >
              {isCreating ? "Creating..." : "Create User"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
