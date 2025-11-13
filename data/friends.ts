import { Friend, FriendMessage } from "@/components/shared/types";

export const dummyFriends: Friend[] = [
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

export const dummyFriendMessages: { [key: string]: FriendMessage[] } = {
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

