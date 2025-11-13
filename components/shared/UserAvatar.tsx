"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserProfile } from "./types";

interface UserAvatarProps {
  user: UserProfile;
  size?: string;
}

export const UserAvatar = ({ user, size = "h-8 w-8" }: UserAvatarProps) => {
  const colors = [
    "bg-primary",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
  ];
  const colorIndex = parseInt(user.id) % colors.length;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background shadow-sm cursor-pointer hover:scale-110 transition-transform`}
        >
          {user.initials}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{user.username}</p>
      </TooltipContent>
    </Tooltip>
  );
};

