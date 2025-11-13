"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FriendAvatar } from "@/components/shared/FriendAvatar";
import { Friend } from "@/components/shared/types";
import { formatDate } from "@/components/shared/utils";

interface FriendsListProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
}

export const FriendsList = ({
  friends,
  selectedFriend,
  onSelectFriend,
}: FriendsListProps) => {
  return (
    <div className="w-80 border-r bg-background flex flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">Friends</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {friends.length} friend{friends.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelectFriend(friend)}
            className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
              selectedFriend?.id === friend.id ? "bg-accent" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <FriendAvatar
                user={{
                  id: friend.id,
                  username: friend.username,
                  initials: friend.initials,
                  isOnline: friend.isOnline,
                }}
                size="h-12 w-12"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm truncate">
                    {friend.username}
                  </p>
                  {friend.lastMessageTime && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(friend.lastMessageTime)}
                    </span>
                  )}
                </div>
                {friend.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">
                    {friend.lastMessage}
                  </p>
                )}
              </div>
              {friend.unreadCount && friend.unreadCount > 0 && (
                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {friend.unreadCount}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
