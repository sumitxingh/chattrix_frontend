"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { MessageList } from "@/components/room/MessageList";
import { MessageInput } from "@/components/room/MessageInput";
import { UserList } from "@/components/room/UserList";
import { VideoCallView } from "@/components/room/VideoCallView";
import { RoomHeader } from "@/components/room/RoomHeader";
import { RoomTabs } from "@/components/room/RoomTabs";
import { SidebarToggle } from "@/components/room/SidebarToggle";
import { LeaveRoomDialog } from "@/components/room/LeaveRoomDialog";
import { KickUserDialog } from "@/components/room/KickUserDialog";
import { RoomFriendsChat } from "@/components/room/RoomFriendsChat";
import {
  Message,
  RoomUser,
  Friend,
  FriendMessage,
} from "@/components/shared/types";
import { dummyRoomUsers } from "@/data/roomUsers";
import { dummyMessages } from "@/data/messages";
import { dummyRoomFriends, dummyRoomFriendMessages } from "@/data/roomFriends";
import { validateMessage, sanitizeInput } from "@/lib/validation";
import { logger } from "@/lib/logger";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  // State
  const [users, setUsers] = useState<RoomUser[]>(dummyRoomUsers);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userToKick, setUserToKick] = useState<RoomUser | null>(null);
  const [showKickDialog, setShowKickDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"room" | "friends">("room");
  const [friends, setFriends] = useState<Friend[]>(dummyRoomFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friendMessages, setFriendMessages] = useState<{
    [key: string]: FriendMessage[];
  }>(dummyRoomFriendMessages);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>(
    {}
  );

  // Effects
  // Note: messagesEndRef is handled by MessageList component

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handlers

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedMessage = sanitizeInput(newMessage);
    if (!validateMessage(sanitizedMessage)) {
      logger.warn("Invalid message");
      return;
    }

    try {
      const newMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: "current-user",
        username: "you",
        message: sanitizedMessage,
        timestamp: new Date(),
        reactions: [],
      };

      // TODO: Replace with actual API call
      // await messagesApi.sendMessage(roomId, sanitizedMessage);

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      setTypingUsers([]);
      logger.info("Message sent in room:", roomId);
    } catch (error) {
      logger.error("Error sending message:", error);
    }
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find((r) => r.emoji === emoji);

        if (existingReaction) {
          const hasUserReacted =
            existingReaction.userIds.includes("current-user");
          const filteredUserIds = existingReaction.userIds.filter(
            (id) => id !== "current-user"
          );

          if (hasUserReacted && filteredUserIds.length === 0) {
            return {
              ...msg,
              reactions: reactions.filter((r) => r.emoji !== emoji),
            };
          }
          return {
            ...msg,
            reactions: reactions.map((r) =>
              r.emoji !== emoji ? r : { ...r, userIds: filteredUserIds }
            ),
          };
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, userIds: ["current-user"] }],
          };
        }
      })
    );
    setShowReactions(null);
  };

  const handleLeaveRoom = () => {
    router.push("/");
  };

  const handleKickUser = (user: RoomUser) => {
    setUserToKick(user);
    setShowKickDialog(true);
  };

  const confirmKickUser = () => {
    if (!userToKick) return;
    setUsers((prev) => prev.filter((user) => user.id !== userToKick.id));
    setShowKickDialog(false);
    setUserToKick(null);
  };

  const handleFollowUser = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === "current-user" ? { ...user, isMuted: !prevMuted } : user
        )
      );
      return !prevMuted;
    });
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === "current-user" ? { ...user, isVideoOn: !prev } : user
        )
      );
      return !prev;
    });
  };

  const startVideoCall = async () => {
    try {
      if (typeof window === "undefined") return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setIsInVideoCall(true);
      setIsVideoOn(true);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === "current-user"
            ? { ...user, isInCall: true, isVideoOn: true }
            : user
        )
      );
    } catch (error) {
      logger.error("Error accessing media devices:", error);
      // In production, you might want to show a user-friendly error message
    }
  };

  const endVideoCall = () => {
    if (localVideoRef.current) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      localVideoRef.current.srcObject = null;
    }

    setIsInVideoCall(false);
    setIsVideoOn(false);
    setIsScreenSharing(false);

    setUsers((prev) =>
      prev.map((user) =>
        user.id === "current-user"
          ? { ...user, isInCall: false, isVideoOn: false }
          : user
      )
    );
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setIsScreenSharing(true);

        stream.getVideoTracks()[0].addEventListener("ended", () => {
          setIsScreenSharing(false);
          if (isInVideoCall) {
            startVideoCall();
          }
        });
      } else {
        if (localVideoRef.current) {
          const stream = localVideoRef.current.srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
        }
        setIsScreenSharing(false);
        if (isInVideoCall) {
          startVideoCall();
        }
      }
    } catch (error) {
      logger.error("Error sharing screen:", error);
    }
  };

  const toggleFullscreen = () => {
    if (typeof window === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    setFriendMessages((prev) => {
      const messages = prev[friend.id] || [];
      return {
        ...prev,
        [friend.id]: messages.map((msg) => ({ ...msg, isRead: true })),
      };
    });
    setFriends((prev) =>
      prev.map((f) => (f.id === friend.id ? { ...f, unreadCount: 0 } : f))
    );
  };

  const handleSendFriendMessage = (friendId: string, message: string) => {
    const sanitizedMessage = sanitizeInput(message);
    if (!validateMessage(sanitizedMessage)) {
      logger.warn("Invalid friend message");
      return;
    }

    try {
      const newMessage: FriendMessage = {
        id: `fm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        friendId,
        senderId: "current-user",
        message: sanitizedMessage,
        timestamp: new Date(),
        isRead: true,
      };

      // TODO: Replace with actual API call
      // await messagesApi.sendFriendMessage(friendId, sanitizedMessage);

      setFriendMessages((prev) => ({
        ...prev,
        [friendId]: [...(prev[friendId] || []), newMessage],
      }));

      setFriends((prev) =>
        prev.map((f) =>
          f.id === friendId
            ? {
                ...f,
                lastMessage: sanitizedMessage,
                lastMessageTime: new Date(),
              }
            : f
        )
      );
      logger.info("Friend message sent to:", friendId);
    } catch (error) {
      logger.error("Error sending friend message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <RoomTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          friends={friends}
        />

        <RoomHeader
          roomId={roomId}
          participantsCount={users.length}
          isInVideoCall={isInVideoCall}
          isMuted={isMuted}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onStartVideoCall={startVideoCall}
          onEndVideoCall={endVideoCall}
          onToggleMute={toggleMute}
        />

        <VideoCallView
          isActive={isInVideoCall}
          users={users}
          localVideoRef={localVideoRef}
          remoteVideoRefs={remoteVideoRefs}
          isVideoOn={isVideoOn}
          isMuted={isMuted}
          isScreenSharing={isScreenSharing}
          isFullscreen={isFullscreen}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenShare}
          onToggleFullscreen={toggleFullscreen}
          onEndCall={endVideoCall}
        />

        {!isInVideoCall && activeTab === "room" && (
          <>
            <MessageList
              messages={messages}
              users={users}
              currentUserId="current-user"
              showReactions={showReactions}
              onToggleReactions={(id) =>
                setShowReactions(showReactions === id ? null : id)
              }
              onAddReaction={handleAddReaction}
              typingUsers={typingUsers}
            />
            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSubmit={handleSendMessage}
            />
          </>
        )}

        {!isInVideoCall && activeTab === "friends" && (
          <RoomFriendsChat
            friends={friends}
            friendMessages={friendMessages}
            selectedFriend={selectedFriend}
            onSelectFriend={handleSelectFriend}
            onSendMessage={handleSendFriendMessage}
          />
        )}
      </div>

      <UserList
        users={users}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        followedUsers={followedUsers}
        onFollowUser={handleFollowUser}
        onKickUser={handleKickUser}
      />

      <SidebarToggle
        isVisible={!isSidebarOpen}
        onToggle={() => setIsSidebarOpen(true)}
      />

      <LeaveRoomDialog
        isOpen={showLeaveDialog}
        onOpenChange={setShowLeaveDialog}
        onConfirm={handleLeaveRoom}
      />

      <KickUserDialog
        isOpen={showKickDialog}
        onOpenChange={setShowKickDialog}
        user={userToKick}
        onConfirm={confirmKickUser}
      />
    </div>
  );
}
