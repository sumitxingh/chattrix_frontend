"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ban, UserX } from "lucide-react";
import { RoomUser } from "@/components/shared/types";

interface KickUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: RoomUser | null;
  onConfirm: () => void;
}

export const KickUserDialog = ({
  isOpen,
  onOpenChange,
  user,
  onConfirm,
}: KickUserDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Ban className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Kick User from Room?</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to kick{" "}
            <span className="font-semibold text-foreground">
              {user.username}
            </span>{" "}
            from this room? They will be removed immediately and will need to
            rejoin if they want to return.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <UserX className="h-4 w-4 mr-2" />
            Kick User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

