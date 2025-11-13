// Shared types for the application

export type UserProfile = {
  id: string;
  username: string;
  avatar?: string;
  initials: string;
};

export type Room = {
  id: string;
  name: string;
  language: string;
  languageCode: string;
  participants: number;
  description: string;
  users: UserProfile[];
};

export type Friend = {
  id: string;
  username: string;
  initials: string;
  isOnline?: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
};

export type FriendMessage = {
  id: string;
  friendId: string;
  senderId: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
};

export type Message = {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  reactions?: { emoji: string; userIds: string[] }[];
};

export type RoomUser = {
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

export type LanguageOption = {
  value: string;
  label: string;
  code: string;
};

