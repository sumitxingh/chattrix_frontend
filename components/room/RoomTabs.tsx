"use client";

import { Friend } from "@/components/shared/types";

interface RoomTabsProps {
  activeTab: "room" | "friends";
  onTabChange: (tab: "room" | "friends") => void;
  friends: Friend[];
}

export const RoomTabs = ({
  activeTab,
  onTabChange,
  friends,
}: RoomTabsProps) => {
  return (
    <div className="border-b bg-background">
      <div className="flex px-6">
        <button
          onClick={() => onTabChange("room")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "room"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Room Chat
        </button>
        <button
          onClick={() => onTabChange("friends")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors relative ${
            activeTab === "friends"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Friends
          {friends.some((f) => (f.unreadCount || 0) > 0) && (
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

