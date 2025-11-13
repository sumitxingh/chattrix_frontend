"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Volume2,
  VolumeX,
  Settings,
  Users,
  Send,
  ArrowLeft,
  Mic,
  MicOff,
  LogOut,
  Smile,
  Circle,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Monitor,
  MonitorOff,
  UserPlus,
  UserCheck,
  UserMinus,
  UserX,
  Ban,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Types
type Message = {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  reactions?: { emoji: string; userIds: string[] }[];
};

type RoomUser = {
  id: string;
  username: string;
  initials: string;
  isMuted?: boolean;
  isOnline?: boolean;
  isVideoOn?: boolean;
  isInCall?: boolean;
  isFollowing?: boolean;
  isFriend?: boolean;
};

type Friend = {
  id: string;
  username: string;
  initials: string;
  isOnline?: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
};

type FriendMessage = {
  id: string;
  friendId: string;
  senderId: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
};

// Dummy users for the room
const dummyRoomUsers: RoomUser[] = [
  { id: "1", username: "john_doe", initials: "JD", isOnline: true },
  { id: "2", username: "sarah_smith", initials: "SS", isOnline: true },
  { id: "3", username: "mike_wilson", initials: "MW", isOnline: false },
  { id: "4", username: "emma_brown", initials: "EB", isOnline: true },
  { id: "5", username: "alex_taylor", initials: "AT", isOnline: false },
  { id: "current-user", username: "you", initials: "YO", isOnline: true },
];

// Dummy messages - using static dates to avoid hydration issues
const dummyMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    username: "john_doe",
    message: "Hello everyone! How are you all doing today?",
    timestamp: new Date("2024-01-15T10:00:00Z"),
  },
  {
    id: "2",
    userId: "2",
    username: "sarah_smith",
    message: "Hi John! I'm doing great, thanks for asking!",
    timestamp: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "3",
    userId: "3",
    username: "mike_wilson",
    message: "Welcome to the room! Let's practice together.",
    timestamp: new Date("2024-01-15T11:00:00Z"),
  },
];

const UserAvatar = ({
  user,
  size = "h-10 w-10",
}: {
  user: RoomUser;
  size?: string;
}) => {
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
  // `parseInt(user.id)` is unsafe; fallback to 0 for "current-user" or other strings
  let colorIndex = 0;
  const n = Number(user.id);
  if (!Number.isNaN(n)) colorIndex = n % colors.length;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <div
            className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-background shadow-sm cursor-pointer hover:scale-110 transition-transform`}
          >
            {user.initials}
          </div>
          {user.isMuted && (
            <div className="absolute -bottom-1 -right-1 bg-destructive rounded-full p-1">
              <VolumeX className="h-3 w-3 text-white" />
            </div>
          )}
          {/* Online status indicator */}
          {user.isOnline !== false && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full border-2 border-background h-3 w-3" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {user.username} {user.isOnline !== false ? "(Online)" : "(Offline)"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

const emojiReactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

// Dummy friends data
const dummyFriends: Friend[] = [
  {
    id: "friend-1",
    username: "john_doe",
    initials: "JD",
    isOnline: true,
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: new Date("2024-01-15T11:30:00Z"),
    unreadCount: 2,
  },
  {
    id: "friend-2",
    username: "sarah_smith",
    initials: "SS",
    isOnline: true,
    lastMessage: "Thanks for the help!",
    lastMessageTime: new Date("2024-01-15T10:15:00Z"),
    unreadCount: 0,
  },
  {
    id: "friend-3",
    username: "mike_wilson",
    initials: "MW",
    isOnline: false,
    lastMessage: "See you later!",
    lastMessageTime: new Date("2024-01-14T18:00:00Z"),
    unreadCount: 1,
  },
];

// Dummy friend messages
const dummyFriendMessages: { [key: string]: FriendMessage[] } = {
  "friend-1": [
    {
      id: "fm-1",
      friendId: "friend-1",
      senderId: "friend-1",
      message: "Hey! How are you doing?",
      timestamp: new Date("2024-01-15T11:30:00Z"),
      isRead: false,
    },
    {
      id: "fm-2",
      friendId: "friend-1",
      senderId: "current-user",
      message: "I'm doing great, thanks! How about you?",
      timestamp: new Date("2024-01-15T11:32:00Z"),
      isRead: true,
    },
    {
      id: "fm-3",
      friendId: "friend-1",
      senderId: "friend-1",
      message: "Awesome! Let's practice Spanish together soon.",
      timestamp: new Date("2024-01-15T11:35:00Z"),
      isRead: false,
    },
  ],
  "friend-2": [
    {
      id: "fm-4",
      friendId: "friend-2",
      senderId: "current-user",
      message: "No problem! Happy to help.",
      timestamp: new Date("2024-01-15T10:10:00Z"),
      isRead: true,
    },
    {
      id: "fm-5",
      friendId: "friend-2",
      senderId: "friend-2",
      message: "Thanks for the help!",
      timestamp: new Date("2024-01-15T10:15:00Z"),
      isRead: true,
    },
  ],
  "friend-3": [
    {
      id: "fm-6",
      friendId: "friend-3",
      senderId: "friend-3",
      message: "See you later!",
      timestamp: new Date("2024-01-14T18:00:00Z"),
      isRead: false,
    },
  ],
};

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
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
  const [friends, setFriends] = useState<Friend[]>(dummyFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friendMessages, setFriendMessages] = useState<{
    [key: string]: FriendMessage[];
  }>(dummyFriendMessages);
  const [friendMessageInput, setFriendMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const friendMessagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>(
    {}
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fix fullscreen event
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

  // LINT FIX: Avoid synchronous setState inside effect. Reimplement "simulate typing" safely.
  useLayoutEffect(() => {
    if (!newMessage || typeof window === "undefined") return;
    const randomUser = users.find((u) => u.id !== "current-user" && u.isOnline);
    if (!randomUser) return;

    // Use deterministic approach, but set state ONLY after tick with microtask (not directly synchronously)
    const shouldShowTyping = newMessage.length % 3 === 0;
    if (shouldShowTyping && !typingUsers.includes(randomUser.id)) {
      // Instead of setState directly, use a timer so effect is safe
      const timeout = setTimeout(() => {
        setTypingUsers((prev) =>
          prev.includes(randomUser.id) ? prev : [...prev, randomUser.id]
        );
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((id) => id !== randomUser.id));
        }, 2000);
      }, 0);
      return () => clearTimeout(timeout);
    }
    // If not typing/showing typing, ensure any shown indicator is removed
    if (!shouldShowTyping && typingUsers.includes(randomUser.id)) {
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((id) => id !== randomUser.id));
      }, 0);
    }
    // eslint-disable-next-line
  }, [newMessage, users]);

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      // In real app, emit "stop typing" event
    }, 1000);
  };

  // Fix: Use callback for setMessages to avoid closure bugs.
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: "current-user",
      username: "you",
      message: newMessage,
      timestamp: new Date(),
      reactions: [],
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    setTypingUsers([]);
  };

  // Fix: Avoid direct mutation of existingReaction.userIds (which mutates state); instead, create new arrays.
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            if (existingReaction.userIds.includes("current-user")) {
              // Remove reaction -- create new userIds array
              const filteredUserIds = existingReaction.userIds.filter(
                (id) => id !== "current-user"
              );
              if (filteredUserIds.length === 0) {
                // Remove reaction completely
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
              // Add reaction
              return {
                ...msg,
                reactions: reactions.map((r) =>
                  r.emoji !== emoji
                    ? r
                    : { ...r, userIds: [...r.userIds, "current-user"] }
                ),
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [...reactions, { emoji, userIds: ["current-user"] }],
            };
          }
        }
        return msg;
      })
    );
    setShowReactions(null);
  };

  const handleLeaveRoom = () => {
    // TODO: Implement leave room logic
    router.push("/");
  };

  const handleKickUser = (user: RoomUser) => {
    setUserToKick(user);
    setShowKickDialog(true);
  };

  const confirmKickUser = () => {
    if (!userToKick) return;

    // Remove user from the room
    setUsers((prev) => prev.filter((user) => user.id !== userToKick.id));

    // TODO: Implement API call to kick user from room
    if (process.env.NODE_ENV !== "production")
      // eslint-disable-next-line no-console
      console.log("Kicked user:", userToKick.username);

    setShowKickDialog(false);
    setUserToKick(null);
  };

  // Functions below: No major bug, but ensure state update patterns are safe.

  const handleFollowUser = (userId: string) => {
    const wasFollowing = followedUsers.has(userId);

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

    // TODO: Implement API call to follow/unfollow user
    // Remove console.log if not needed in prod
    if (process.env.NODE_ENV !== "production")
      // eslint-disable-next-line no-console
      console.log(wasFollowing ? "Unfollowed" : "Followed", userId);
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
    setIsVideoOn((prevVideoOn) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === "current-user"
            ? { ...user, isVideoOn: !prevVideoOn }
            : user
        )
      );
      // TODO: Implement actual video stream toggle
      if (localVideoRef.current) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getVideoTracks().forEach((track) => {
            track.enabled = !prevVideoOn;
          });
        }
      }
      return !prevVideoOn;
    });
  };

  const startVideoCall = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setIsInVideoCall(true);
      setIsVideoOn(true);
      setIsMuted(false);

      // Update users to show they're in call
      setUsers((prev) =>
        prev.map((user) =>
          user.id === "current-user"
            ? { ...user, isInCall: true, isVideoOn: true, isMuted: false }
            : user
        )
      );
      // TODO: Connect to WebRTC/Video call service
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error accessing media devices:", error);
      alert("Could not access camera/microphone. Please check permissions.");
    }
  };

  const endVideoCall = () => {
    // Stop all tracks
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

        // Stop screen share when user stops sharing
        stream.getVideoTracks()[0].addEventListener("ended", () => {
          setIsScreenSharing(false);
          if (isInVideoCall) {
            startVideoCall();
          }
        });
      } else {
        // Stop screen share and resume camera
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
      // eslint-disable-next-line no-console
      console.error("Error sharing screen:", error);
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    const diffTime = today.getTime() - messageDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    // Mark messages as read
    setFriendMessages((prev) => {
      const messages = prev[friend.id] || [];
      return {
        ...prev,
        [friend.id]: messages.map((msg) => ({ ...msg, isRead: true })),
      };
    });
    // Clear unread count
    setFriends((prev) =>
      prev.map((f) => (f.id === friend.id ? { ...f, unreadCount: 0 } : f))
    );
  };

  const handleSendFriendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFriend || !friendMessageInput.trim()) return;

    const newMessage: FriendMessage = {
      id: `fm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      friendId: selectedFriend.id,
      senderId: "current-user",
      message: friendMessageInput,
      timestamp: new Date(),
      isRead: true,
    };

    setFriendMessages((prev) => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage],
    }));

    // Update friend's last message
    setFriends((prev) =>
      prev.map((f) =>
        f.id === selectedFriend.id
          ? {
              ...f,
              lastMessage: friendMessageInput,
              lastMessageTime: new Date(),
            }
          : f
      )
    );

    setFriendMessageInput("");
  };

  useLayoutEffect(() => {
    if (selectedFriend && friendMessagesEndRef.current) {
      friendMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [friendMessages, selectedFriend]);

  // --------- Render ---------
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="border-b bg-background">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab("room")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "room"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Room Chat
            </button>
            <button
              onClick={() => setActiveTab("friends")}
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

        {/* Header */}
        <div className="border-b bg-background px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Room {roomId}</h1>
              <p className="text-sm text-muted-foreground">
                {users.length} participants
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden"
                >
                  {isSidebarOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSidebarOpen ? "Hide sidebar" : "Show sidebar"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isInVideoCall ? "default" : "ghost"}
                  size="icon"
                  onClick={isInVideoCall ? endVideoCall : startVideoCall}
                  className={
                    isInVideoCall
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : ""
                  }
                >
                  {isInVideoCall ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isInVideoCall ? "End Video Call" : "Start Video Call"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className={isMuted ? "text-destructive" : ""}
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Room Settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLeaveDialog(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Leave Room</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Video Call View */}
        <AnimatePresence>
          {isInVideoCall && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-black relative overflow-hidden"
            >
              <div
                className={`grid gap-2 p-2 h-full ${
                  users.filter((u) => u.isInCall).length === 1
                    ? "grid-cols-1"
                    : users.filter((u) => u.isInCall).length === 2
                    ? "grid-cols-2"
                    : users.filter((u) => u.isInCall).length <= 4
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {/* Local Video */}
                <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {!isVideoOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                      <UserAvatar
                        user={
                          users.find((u) => u.id === "current-user") ||
                          dummyRoomUsers[5]
                        }
                        size="h-24 w-24"
                      />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1 text-white text-sm">
                    You {isMuted && <MicOff className="h-3 w-3 inline ml-1" />}
                  </div>
                </div>

                {/* Remote Videos */}
                {users
                  .filter((u) => u.id !== "current-user" && u.isInCall)
                  .map((user) => (
                    <div
                      key={user.id}
                      className="relative bg-zinc-900 rounded-lg overflow-hidden"
                    >
                      {user.isVideoOn ? (
                        <video
                          ref={(el) => {
                            remoteVideoRefs.current[user.id] = el;
                          }}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                          <UserAvatar user={user} size="h-24 w-24" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1 text-white text-sm">
                        {user.username}
                        {user.isMuted && (
                          <MicOff className="h-3 w-3 inline ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Video Call Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className={
                        isMuted
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "text-white hover:bg-white/20"
                      }
                    >
                      {isMuted ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleVideo}
                      className={
                        !isVideoOn
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "text-white hover:bg-white/20"
                      }
                    >
                      {isVideoOn ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <VideoOff className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleScreenShare}
                      className={
                        isScreenSharing
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "text-white hover:bg-white/20"
                      }
                    >
                      {isScreenSharing ? (
                        <MonitorOff className="h-5 w-5" />
                      ) : (
                        <Monitor className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isScreenSharing ? "Stop sharing" : "Share screen"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-5 w-5" />
                      ) : (
                        <Maximize2 className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</p>
                  </TooltipContent>
                </Tooltip>
                <div className="w-px h-6 bg-white/30 mx-2" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={endVideoCall}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room Chat Messages Area */}
        {!isInVideoCall && activeTab === "room" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => {
              const isOwnMessage = message.userId === "current-user";
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
                    <UserAvatar
                      user={
                        users.find((u) => u.id === message.userId) ||
                        dummyRoomUsers[0]
                      }
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
                        {/* Reaction button */}
                        <button
                          onClick={() =>
                            setShowReactions(
                              showReactions === message.id ? null : message.id
                            )
                          }
                          className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-full p-1.5 hover:bg-accent"
                        >
                          <Smile className="h-3 w-3" />
                        </button>
                        {/* Reaction picker */}
                        <AnimatePresence>
                          {showReactions === message.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute -top-12 right-0 bg-background border rounded-lg p-2 flex gap-1 shadow-lg z-10"
                            >
                              {emojiReactions.map((emoji, idx) => (
                                <motion.button
                                  key={emoji}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    delay: idx * 0.05,
                                    type: "spring",
                                  }}
                                  whileHover={{ scale: 1.3 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    handleAddReaction(message.id, emoji)
                                  }
                                  className="text-2xl p-1"
                                >
                                  {emoji}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Reactions - Outside message container, bigger size */}
                      <AnimatePresence>
                        {message.reactions && message.reactions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`flex gap-2 mt-1 flex-wrap ${
                              isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            {message.reactions.map((reaction, idx) => (
                              <motion.button
                                key={idx}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                  duration: 0.2,
                                  delay: idx * 0.05,
                                }}
                                onClick={() =>
                                  handleAddReaction(message.id, reaction.emoji)
                                }
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border hover:bg-accent transition-colors ${
                                  reaction.userIds.includes("current-user")
                                    ? "border-primary bg-primary/10"
                                    : ""
                                }`}
                              >
                                <span className="text-2xl">
                                  {reaction.emoji}
                                </span>
                                <span className="text-sm font-medium">
                                  {reaction.userIds.length}
                                </span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {isOwnMessage && (
                    <UserAvatar
                      user={
                        users.find((u) => u.id === "current-user") ||
                        dummyRoomUsers[5]
                      }
                      size="h-8 w-8"
                    />
                  )}
                </motion.div>
              );
            })}
            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex gap-3 justify-start">
                <UserAvatar
                  user={
                    users.find((u) => u.id === typingUsers[0]) ||
                    dummyRoomUsers[0]
                  }
                  size="h-8 w-8"
                />
                <div className="bg-card border rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span className="text-xs text-muted-foreground">
                      {users.find((u) => u.id === typingUsers[0])?.username ||
                        "Someone"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      is typing
                    </span>
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
        )}

        {/* Room Message Input */}
        {!isInVideoCall && activeTab === "room" && (
          <div className="border-t bg-background p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        )}

        {/* Friends Chat Area */}
        {!isInVideoCall && activeTab === "friends" && (
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
                    onClick={() => handleSelectFriend(friend)}
                    className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                      selectedFriend?.id === friend.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
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
                      <UserAvatar
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
                    {friendMessages[selectedFriend.id]?.map(
                      (message, index) => {
                        const isOwnMessage =
                          message.senderId === "current-user";
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
                              <UserAvatar
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
                              <UserAvatar
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
                      }
                    )}
                    <div ref={friendMessagesEndRef} />
                  </div>

                  {/* Friend Message Input */}
                  <div className="border-t bg-background p-4">
                    <form
                      onSubmit={handleSendFriendMessage}
                      className="flex gap-2"
                    >
                      <Input
                        value={friendMessageInput}
                        onChange={(e) => setFriendMessageInput(e.target.value)}
                        placeholder={`Message ${selectedFriend.username}...`}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        disabled={!friendMessageInput.trim()}
                      >
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
        )}
      </div>

      {/* Sidebar - Users List */}
      <AnimatePresence>
        {isSidebarOpen && (
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
                        onClick={() => setIsSidebarOpen(false)}
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
                  <UserAvatar user={user} size="h-10 w-10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">
                        {user.username}
                        {user.id === "current-user" && (
                          <span className="text-muted-foreground ml-1">
                            (You)
                          </span>
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
                            onClick={() => handleFollowUser(user.id)}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                            onClick={() => handleKickUser(user)}
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
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Button (when hidden) */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-20 z-10 hidden md:block"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSidebarOpen(true)}
                    className="bg-background shadow-lg hover:bg-accent"
                  >
                    <PanelLeftOpen className="h-5 w-5" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show sidebar</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leave Room Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Room?</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave this room? You can rejoin later if
              you want.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLeaveRoom}>
              Leave Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Kick User Dialog */}
      <Dialog open={showKickDialog} onOpenChange={setShowKickDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Ban className="h-5 w-5 text-destructive" />
              </div>
              <DialogTitle>Kick User from Room?</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to kick{" "}
              <span className="font-semibold text-foreground">
                {userToKick?.username}
              </span>{" "}
              from this room? They will be removed immediately and will need to
              rejoin if they want to return.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowKickDialog(false);
                setUserToKick(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmKickUser}>
              <UserX className="h-4 w-4 mr-2" />
              Kick User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
