import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const UserCredentialsModal = ({ isOpen, onClose, credentials }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Created Successfully</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Username</p>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <span className="flex-1 font-mono">{credentials?.username}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(credentials?.username)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Password</p>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <span className="flex-1 font-mono">{credentials?.password}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(credentials?.password)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Please save these credentials. The password cannot be recovered
            later.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserCredentialsModal;
