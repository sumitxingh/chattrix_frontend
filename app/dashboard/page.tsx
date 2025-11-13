"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Languages,
  Users,
  ArrowRight,
  Plus,
  Search,
  X,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// User profile type
type UserProfile = {
  id: string;
  username: string;
  avatar?: string;
  initials: string;
};

// Friend types
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

// Room type
type Room = {
  id: string;
  name: string;
  language: string;
  languageCode: string;
  participants: number;
  description: string;
  users: UserProfile[];
};

// Dummy data for rooms with user profiles
const dummyRooms: Room[] = [
  {
    id: "1",
    name: "English Conversation Room",
    language: "English",
    languageCode: "en",
    participants: 12,
    description: "Practice your English with native speakers",
    users: [
      { id: "1", username: "john_doe", initials: "JD" },
      { id: "2", username: "sarah_smith", initials: "SS" },
      { id: "3", username: "mike_wilson", initials: "MW" },
      { id: "4", username: "emma_brown", initials: "EB" },
      { id: "5", username: "alex_taylor", initials: "AT" },
    ],
  },
  {
    id: "2",
    name: "Spanish Chat Room",
    language: "Spanish",
    languageCode: "es",
    participants: 8,
    description: "Hablemos en español",
    users: [
      { id: "6", username: "carlos_rodriguez", initials: "CR" },
      { id: "7", username: "maria_garcia", initials: "MG" },
      { id: "8", username: "juan_martinez", initials: "JM" },
      { id: "9", username: "sofia_lopez", initials: "SL" },
    ],
  },
  {
    id: "3",
    name: "French Discussion",
    language: "French",
    languageCode: "fr",
    participants: 15,
    description: "Parlons français ensemble",
    users: [
      { id: "10", username: "pierre_dubois", initials: "PD" },
      { id: "11", username: "marie_bernard", initials: "MB" },
      { id: "12", username: "luc_martin", initials: "LM" },
      { id: "13", username: "sophie_durand", initials: "SD" },
      { id: "14", username: "antoine_leroy", initials: "AL" },
    ],
  },
  {
    id: "4",
    name: "Japanese Practice",
    language: "Japanese",
    languageCode: "ja",
    participants: 6,
    description: "日本語で話しましょう",
    users: [
      { id: "15", username: "yuki_tanaka", initials: "YT" },
      { id: "16", username: "kenji_yamamoto", initials: "KY" },
      { id: "17", username: "akiko_sato", initials: "AS" },
    ],
  },
  {
    id: "5",
    name: "German Speakers",
    language: "German",
    languageCode: "de",
    participants: 9,
    description: "Lass uns auf Deutsch sprechen",
    users: [
      { id: "18", username: "hans_mueller", initials: "HM" },
      { id: "19", username: "anna_schmidt", initials: "AS" },
      { id: "20", username: "thomas_fischer", initials: "TF" },
      { id: "21", username: "lisa_weber", initials: "LW" },
    ],
  },
  {
    id: "6",
    name: "Mandarin Exchange",
    language: "Mandarin",
    languageCode: "zh",
    participants: 11,
    description: "用中文交流",
    users: [
      { id: "22", username: "wei_zhang", initials: "WZ" },
      { id: "23", username: "li_wang", initials: "LW" },
      { id: "24", username: "ming_chen", initials: "MC" },
      { id: "25", username: "jing_liu", initials: "JL" },
      { id: "26", username: "hao_zhou", initials: "HZ" },
    ],
  },
];

// Avatar component for user profiles
const UserAvatar = ({
  user,
  size = "h-8 w-8",
}: {
  user: UserProfile;
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
  const colorIndex = parseInt(user.id) % colors.length;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-background shadow-sm cursor-pointer hover:scale-110 transition-transform`}
        >
          {user.initials}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{user.username}</p>
      </TooltipContent>
    </Tooltip>
  );
};

// Available languages for room creation
const availableLanguages = [
  { value: "en", label: "English", code: "EN" },
  { value: "es", label: "Spanish", code: "ES" },
  { value: "fr", label: "French", code: "FR" },
  { value: "ja", label: "Japanese", code: "JA" },
  { value: "de", label: "German", code: "DE" },
  { value: "zh", label: "Mandarin", code: "ZH" },
  { value: "it", label: "Italian", code: "IT" },
  { value: "pt", label: "Portuguese", code: "PT" },
  { value: "ru", label: "Russian", code: "RU" },
  { value: "ko", label: "Korean", code: "KO" },
  // Indian Languages
  { value: "hi", label: "Hindi", code: "HI" },
  { value: "ta", label: "Tamil", code: "TA" },
  { value: "te", label: "Telugu", code: "TE" },
  { value: "bn", label: "Bengali", code: "BN" },
  { value: "mr", label: "Marathi", code: "MR" },
  { value: "gu", label: "Gujarati", code: "GU" },
  { value: "kn", label: "Kannada", code: "KN" },
  { value: "ml", label: "Malayalam", code: "ML" },
  { value: "pa", label: "Punjabi", code: "PA" },
  { value: "ur", label: "Urdu", code: "UR" },
  // Other Languages
  { value: "ar", label: "Arabic", code: "AR" },
  { value: "tr", label: "Turkish", code: "TR" },
  { value: "pl", label: "Polish", code: "PL" },
  { value: "nl", label: "Dutch", code: "NL" },
  { value: "sv", label: "Swedish", code: "SV" },
  { value: "da", label: "Danish", code: "DA" },
  { value: "no", label: "Norwegian", code: "NO" },
  { value: "fi", label: "Finnish", code: "FI" },
  { value: "el", label: "Greek", code: "EL" },
  { value: "he", label: "Hebrew", code: "HE" },
  { value: "th", label: "Thai", code: "TH" },
  { value: "vi", label: "Vietnamese", code: "VI" },
  { value: "id", label: "Indonesian", code: "ID" },
  { value: "ms", label: "Malay", code: "MS" },
  { value: "cs", label: "Czech", code: "CS" },
  { value: "hu", label: "Hungarian", code: "HU" },
  { value: "ro", label: "Romanian", code: "RO" },
  { value: "uk", label: "Ukrainian", code: "UK" },
  { value: "bg", label: "Bulgarian", code: "BG" },
  { value: "hr", label: "Croatian", code: "HR" },
];

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

// Friend Avatar Component
const FriendAvatar = ({
  user,
  size = "h-10 w-10",
}: {
  user: { id: string; username: string; initials: string; isOnline?: boolean };
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
  let colorIndex = 0;
  const n = Number(user.id.replace("friend-", "").replace("current-user", "0"));
  if (!Number.isNaN(n)) colorIndex = n % colors.length;

  return (
    <div className="relative">
      <div
        className={`${size} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-background shadow-sm`}
      >
        {user.initials}
      </div>
      {user.isOnline !== false && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full border-2 border-background h-3 w-3" />
      )}
    </div>
  );
};

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>(dummyRooms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [roomForm, setRoomForm] = useState({
    name: "",
    language: "",
    userLimit: "",
  });
  const [activeTab, setActiveTab] = useState<"rooms" | "friends">("rooms");
  const [friends, setFriends] = useState<Friend[]>(dummyFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friendMessages, setFriendMessages] = useState<{
    [key: string]: FriendMessage[];
  }>(dummyFriendMessages);
  const [friendMessageInput, setFriendMessageInput] = useState("");
  const friendMessagesEndRef = useRef<HTMLDivElement>(null);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedLanguage = availableLanguages.find(
      (lang) => lang.value === roomForm.language
    );

    if (!selectedLanguage) return;

    const newRoom: Room = {
      id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: roomForm.name,
      language: selectedLanguage.label,
      languageCode: roomForm.language,
      participants: 1,
      description: `Practice ${selectedLanguage.label} with others`,
      users: [
        {
          id: "current-user",
          username: "you",
          initials: "YO",
        },
      ],
    };

    setRooms((prev) => [newRoom, ...prev]);
    setRoomForm({ name: "", language: "", userLimit: "" });
    setIsDialogOpen(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setRoomForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter rooms based on search and language
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "all" || room.languageCode === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("rooms")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "rooms"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Rooms
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

        {/* Rooms Tab */}
        {activeTab === "rooms" && (
          <>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Rooms</h1>
                <p className="text-muted-foreground">
                  Rooms you&apos;ve joined to practice languages
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Room
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Room</DialogTitle>
                    <DialogDescription>
                      Create a new language practice room. Choose the language
                      and set a user limit.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateRoom}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="room-name">Room Name</Label>
                        <Input
                          id="room-name"
                          name="name"
                          placeholder="e.g., English Conversation Room"
                          value={roomForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          name="language"
                          value={roomForm.language}
                          onValueChange={(value) =>
                            handleInputChange({
                              target: { name: "language", value },
                            })
                          }
                          required
                        >
                          <SelectTrigger id="language" className="w-full">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableLanguages.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                <div className="flex items-center gap-2">
                                  <span>{lang.label}</span>
                                  <span className="text-muted-foreground">
                                    ({lang.code})
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-limit">User Limit</Label>
                        <Input
                          id="user-limit"
                          name="userLimit"
                          type="number"
                          min="2"
                          max="50"
                          placeholder="e.g., 10"
                          value={roomForm.userLimit}
                          onChange={handleInputChange}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum number of users who can join this room (2-50)
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Create Room</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredRooms.length === 0 ? (
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>
                    {searchQuery || selectedLanguage !== "all"
                      ? "No Rooms Found"
                      : "No Rooms Yet"}
                  </CardTitle>
                  <CardDescription>
                    {searchQuery || selectedLanguage !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Join a room to start practicing languages with others"}
                  </CardDescription>
                </CardHeader>
                {(searchQuery || selectedLanguage !== "all") && (
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedLanguage("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="mb-2">{room.name}</CardTitle>
                            <CardDescription>
                              {room.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Languages className="h-4 w-4 text-primary" />
                          <span className="font-medium">{room.language}</span>
                          <span className="text-muted-foreground">
                            ({room.languageCode.toUpperCase()})
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{room.participants} participants</span>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <div className="flex -space-x-2">
                              {room.users.slice(0, 5).map((user) => (
                                <UserAvatar key={user.id} user={user} />
                              ))}
                              {room.users.length > 5 && (
                                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                                  +{room.users.length - 5}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 ml-2">
                              <p className="text-xs text-muted-foreground">
                                {room.users
                                  .slice(0, 3)
                                  .map((u) => u.username)
                                  .join(", ")}
                                {room.users.length > 3 &&
                                  ` +${room.users.length - 3} more`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href={`/room/${room.id}`}>
                            Enter Room
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div className="flex h-[calc(100vh-12rem)]">
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
            <div className="flex-1 flex flex-col bg-background">
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
                    {friendMessages[selectedFriend.id]?.map(
                      (message, index) => {
                        const isOwnMessage =
                          message.senderId === "current-user";
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.05,
                            }}
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
    </div>
  );
}
