import { Message } from "@/components/shared/types";

export const dummyMessages: Message[] = [
  {
    id: "1",
    userId: "1",
    username: "john_doe",
    message: "Hello everyone! Welcome to the room.",
    timestamp: new Date("2024-01-15T10:00:00Z"),
    reactions: [],
  },
  {
    id: "2",
    userId: "2",
    username: "sarah_smith",
    message: "Hi John! Excited to practice together.",
    timestamp: new Date("2024-01-15T10:02:00Z"),
    reactions: [{ emoji: "👍", userIds: ["current-user", "1"] }],
  },
  {
    id: "3",
    userId: "current-user",
    username: "you",
    message: "Thanks for having me!",
    timestamp: new Date("2024-01-15T10:03:00Z"),
    reactions: [],
  },
  {
    id: "4",
    userId: "3",
    username: "mike_wilson",
    message: "Let's start practicing!",
    timestamp: new Date("2024-01-15T10:05:00Z"),
    reactions: [
      { emoji: "👍", userIds: ["current-user"] },
      { emoji: "❤️", userIds: ["2"] },
    ],
  },
];

