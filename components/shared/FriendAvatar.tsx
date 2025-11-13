"use client";

import { Friend, RoomUser } from "./types";

interface FriendAvatarProps {
  user: Friend | RoomUser;
  size?: string;
}

export const FriendAvatar = ({
  user,
  size = "h-10 w-10",
}: FriendAvatarProps) => {
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
  let colorIndex = 0;
  const n = Number(user.id.replace("friend-", "").replace("current-user", "0"));
  if (!Number.isNaN(n)) colorIndex = n % colors.length;

  return (
    <div className="relative">
      <div
        className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-background shadow-sm`}
      >
        {user.initials}
      </div>
      {"isOnline" in user && user.isOnline !== false && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full border-2 border-background h-3 w-3" />
      )}
    </div>
  );
};
