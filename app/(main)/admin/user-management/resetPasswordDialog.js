import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ResetPasswordDialog = ({
  open,
  onOpenChange,
  newPassword,
  hashedPassword,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Password Reset Successful</DialogTitle>
          <DialogDescription>
            Please save these credentials securely
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>New Password</Label>
            <div className="flex gap-2">
              <Input readOnly value={newPassword} />
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(newPassword)}
              >
                Copy
              </Button>
            </div>
          </div>
          {/* <div className="grid gap-2">
            <Label>Hashed Password (SHA-1)</Label>
            <Input readOnly value={hashedPassword} />
          </div> */}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
