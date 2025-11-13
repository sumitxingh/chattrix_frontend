"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Users } from "lucide-react";
import { FriendAvatar } from "@/components/shared/FriendAvatar";
import { Friend, FriendMessage } from "@/components/shared/types";
import { formatTime, formatDate } from "@/components/shared/utils";

interface RoomFriendsChatProps {
  friends: Friend[];
  friendMessages: { [key: string]: FriendMessage[] };
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
  onSendMessage: (friendId: string, message: string) => void;
}

export const RoomFriendsChat = ({
  friends,
  friendMessages,
  selectedFriend,
  onSelectFriend,
  onSendMessage,
}: RoomFriendsChatProps) => {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (selectedFriend && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [friendMessages, selectedFriend]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFriend || !messageInput.trim()) return;
    onSendMessage(selectedFriend.id, messageInput);
    setMessageInput("");
  };

  return (
    <div className="flex-1 flex">
      {/* Friends List */}
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

      {/* Friend Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Friend Chat Header */}
            <div className="border-b bg-background px-6 py-4">
              <div className="flex items-center gap-3">
                <FriendAvatar
                  user={{
                    id: selectedFriend.id,
                    username: selectedFriend.username,
                    initials: selectedFriend.initials,
                    isOnline: selectedFriend.isOnline,
                  }}
                  size="h-10 w-10"
                />
                <div>
                  <p className="font-medium">{selectedFriend.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFriend.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Friend Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {friendMessages[selectedFriend.id]?.map((message, index) => {
                const isOwnMessage = message.senderId === "current-user";
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
                    {!isOwnMessage && (
                      <FriendAvatar
                        user={{
                          id: selectedFriend.id,
                          username: selectedFriend.username,
                          initials: selectedFriend.initials,
                        }}
                        size="h-8 w-8"
                      />
                    )}
                    <div
                      className={`max-w-[70%] flex flex-col gap-1 ${
                        isOwnMessage ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          isOwnMessage
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    {isOwnMessage && (
                      <FriendAvatar
                        user={{
                          id: "current-user",
                          username: "you",
                          initials: "YO",
                        }}
                        size="h-8 w-8"
                      />
                    )}
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Friend Message Input */}
            <div className="border-t bg-background p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message ${selectedFriend.username}...`}
                  className="flex-1"
                />
                <Button type="submit" disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">
                Select a friend to start chatting
              </p>
              <p className="text-sm text-muted-foreground">
                Choose a friend from the list to begin a conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

