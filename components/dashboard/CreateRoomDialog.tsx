"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { availableLanguages } from "@/components/shared/constants";
import { validateRoomName, validateUserLimit, sanitizeInput } from "@/lib/validation";

interface CreateRoomDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roomForm: {
    name: string;
    language: string;
    userLimit: string;
  };
  onInputChange: (e: { target: { name: string; value: string } }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CreateRoomDialog = ({
  isOpen,
  onOpenChange,
  roomForm,
  onInputChange,
  onSubmit,
}: CreateRoomDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            Create a new language practice room. Choose the language and set a
            user limit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="room-name">Room Name</Label>
                        <Input
                          id="room-name"
                          name="name"
                          placeholder="e.g., English Conversation Room"
                          value={roomForm.name}
                          onChange={(e) =>
                            onInputChange({
                              target: { name: e.target.name, value: e.target.value },
                            })
                          }
                          required
                          minLength={3}
                          maxLength={50}
                        />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                name="language"
                value={roomForm.language}
                onValueChange={(value) =>
                  onInputChange({
                    target: { name: "language", value },
                  })
                }
                required
              >
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <div className="flex items-center gap-2">
                        <span>{lang.label}</span>
                        <span className="text-muted-foreground">
                          ({lang.code})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-limit">User Limit</Label>
                        <Input
                          id="user-limit"
                          name="userLimit"
                          type="number"
                          min="2"
                          max="50"
                          placeholder="e.g., 10"
                          value={roomForm.userLimit}
                          onChange={(e) =>
                            onInputChange({
                              target: { name: e.target.name, value: e.target.value },
                            })
                          }
                          required
                          step="1"
                        />
              <p className="text-xs text-muted-foreground">
                Maximum number of users who can join this room (2-50)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
