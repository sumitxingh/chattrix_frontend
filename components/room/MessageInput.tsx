"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { validateMessage, sanitizeInput } from "@/lib/validation";
import { logger } from "@/lib/logger";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export const MessageInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Type your message...",
}: MessageInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedValue = sanitizeInput(value);
    if (!validateMessage(sanitizedValue)) {
      logger.warn("Invalid message");
      return;
    }

    onSubmit(e);
  };

  return (
    <div className="border-t bg-background p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          maxLength={1000}
        />
        <Button type="submit" disabled={!value.trim()}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  );
};

