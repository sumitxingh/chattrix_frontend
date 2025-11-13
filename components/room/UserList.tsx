"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  PanelLeftClose,
  UserPlus,
  UserMinus,
  UserX,
  Volume2,
  Circle,
  VolumeX,
  UserCheck,
} from "lucide-react";
import { FriendAvatar } from "@/components/shared/FriendAvatar";
import { RoomUser } from "@/components/shared/types";

interface UserListProps {
  users: RoomUser[];
  isOpen: boolean;
  onClose: () => void;
  followedUsers: Set<string>;
  onFollowUser: (userId: string) => void;
  onKickUser: (user: RoomUser) => void;
}

export const UserList = ({
  users,
  isOpen,
  onClose,
  followedUsers,
  onFollowUser,
  onKickUser,
}: UserListProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 320, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-80 border-l bg-background flex flex-col overflow-hidden"
      >
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Participants</h2>
            </div>
            <div className="flex items-center gap-2">
              {followedUsers.size > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {followedUsers.size} following
                </Badge>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hidden md:flex"
                    onClick={onClose}
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide sidebar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {users.length} user{users.length !== 1 ? "s" : ""} in room
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <FriendAvatar
                user={{
                  id: user.id,
                  username: user.username,
                  initials: user.initials,
                  isOnline: user.isOnline,
                }}
                size="h-10 w-10"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">
                    {user.username}
                    {user.id === "current-user" && (
                      <span className="text-muted-foreground ml-1">(You)</span>
                    )}
                  </p>
                  {user.isOnline !== false && (
                    <Badge variant="outline" className="h-4 px-1.5 text-xs">
                      <Circle className="h-2 w-2 fill-green-500 text-green-500 mr-1" />
                      Online
                    </Badge>
                  )}
                </div>
                {user.isMuted && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <VolumeX className="h-3 w-3" />
                    Muted
                  </p>
                )}
                {followedUsers.has(user.id) && (
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <UserCheck className="h-3 w-3" />
                    Following
                  </p>
                )}
              </div>
              {user.id !== "current-user" && (
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onFollowUser(user.id)}
                      >
                        {followedUsers.has(user.id) ? (
                          <UserMinus className="h-4 w-4 text-primary" />
                        ) : (
                          <UserPlus className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {followedUsers.has(user.id)
                          ? "Unfollow user"
                          : "Follow user"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mute user</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onKickUser(user)}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Kick user from room</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
