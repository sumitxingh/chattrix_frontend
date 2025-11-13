"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Message, RoomUser } from "@/components/shared/types";
import { formatTime } from "@/components/shared/utils";
import { ReactionPicker } from "./ReactionPicker";
import { MessageReactions } from "./MessageReactions";

interface MessageListProps {
  messages: Message[];
  users: RoomUser[];
  currentUserId: string;
  showReactions: string | null;
  onToggleReactions: (messageId: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
  typingUsers: string[];
}

export const MessageList = ({
  messages,
  users,
  currentUserId,
  showReactions,
  onToggleReactions,
  onAddReaction,
  typingUsers,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message, index) => {
        const isOwnMessage = message.userId === currentUserId;
        const messageUser = users.find((u) => u.id === message.userId);
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex gap-3 ${
              isOwnMessage ? "justify-end" : "justify-start"
            }`}
          >
            {!isOwnMessage && messageUser && (
              <UserAvatar
                user={{
                  id: messageUser.id,
                  username: messageUser.username,
                  initials: messageUser.initials,
                }}
                size="h-8 w-8"
              />
            )}
            <div
              className={`max-w-[70%] ${
                isOwnMessage ? "items-end" : "items-start"
              } flex flex-col gap-1`}
            >
              {!isOwnMessage && (
                <span className="text-xs text-muted-foreground font-medium">
                  {message.username}
                </span>
              )}
              <div className="relative group">
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <button
                    onClick={() => onToggleReactions(message.id)}
                    className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-full p-1.5 hover:bg-accent"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <ReactionPicker
                    messageId={message.id}
                    isVisible={showReactions === message.id}
                    onAddReaction={onAddReaction}
                  />
                </div>
                <MessageReactions
                  reactions={message.reactions || []}
                  isOwnMessage={isOwnMessage}
                  onAddReaction={(emoji) => onAddReaction(message.id, emoji)}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
            </div>
            {isOwnMessage && (
              <UserAvatar
                user={{
                  id: currentUserId,
                  username: "you",
                  initials: "YO",
                }}
                size="h-8 w-8"
              />
            )}
          </motion.div>
        );
      })}
      {typingUsers.length > 0 && (
        <div className="flex gap-3 justify-start">
          <UserAvatar
            user={{
              id: typingUsers[0],
              username: users.find((u) => u.id === typingUsers[0])?.username || "Someone",
              initials: users.find((u) => u.id === typingUsers[0])?.initials || "S",
            }}
            size="h-8 w-8"
          />
          <div className="bg-card border rounded-lg px-4 py-2">
            <div className="flex gap-1">
              <span className="text-xs text-muted-foreground">
                {users.find((u) => u.id === typingUsers[0])?.username || "Someone"}
              </span>
              <span className="text-xs text-muted-foreground">is typing</span>
              <div className="flex gap-1 ml-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

