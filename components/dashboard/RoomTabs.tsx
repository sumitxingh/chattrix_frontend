"use client";

import { Friend } from "@/components/shared/types";

interface RoomTabsProps {
  activeTab: "rooms" | "friends";
  onTabChange: (tab: "rooms" | "friends") => void;
  friends: Friend[];
}

export const RoomTabs = ({
  activeTab,
  onTabChange,
  friends,
}: RoomTabsProps) => {
  return (
    <div className="mb-6 border-b">
      <div className="flex">
        <button
          onClick={() => onTabChange("rooms")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "rooms"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Rooms
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
