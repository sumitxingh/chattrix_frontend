"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoomCard } from "@/components/dashboard/RoomCard";
import { CreateRoomDialog } from "@/components/dashboard/CreateRoomDialog";
import { RoomTabs } from "@/components/dashboard/RoomTabs";
import { RoomFilters } from "@/components/dashboard/RoomFilters";
import { FriendsList } from "@/components/dashboard/FriendsList";
import { FriendChat } from "@/components/dashboard/FriendChat";
import { Room, Friend, FriendMessage } from "@/components/shared/types";
import { availableLanguages } from "@/components/shared/constants";
import { dummyRooms } from "@/data/rooms";
import { dummyFriends, dummyFriendMessages } from "@/data/friends";
import {
  validateRoomName,
  validateUserLimit,
  sanitizeInput,
  validateMessage,
} from "@/lib/validation";
import { logger } from "@/lib/logger";

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

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate inputs
      const sanitizedName = sanitizeInput(roomForm.name);
      if (!validateRoomName(sanitizedName)) {
        logger.warn("Invalid room name");
        return;
      }

      if (!validateUserLimit(roomForm.userLimit)) {
        logger.warn("Invalid user limit");
        return;
      }

      const selectedLanguageOption = availableLanguages.find(
        (lang) => lang.value === roomForm.language
      );

      if (!selectedLanguageOption) {
        logger.warn("Invalid language selected");
        return;
      }

      const newRoom: Room = {
        id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: sanitizedName,
        language: selectedLanguageOption.label,
        languageCode: roomForm.language,
        participants: 1,
        description: `Practice ${selectedLanguageOption.label} with others`,
        users: [
          {
            id: "current-user",
            username: "you",
            initials: "YO",
          },
        ],
      };

      // TODO: Replace with actual API call
      // await roomsApi.createRoom({
      //   name: sanitizedName,
      //   language: roomForm.language,
      //   userLimit: parseInt(roomForm.userLimit, 10),
      // });

      setRooms((prev) => [newRoom, ...prev]);
      setRoomForm({ name: "", language: "", userLimit: "" });
      setIsDialogOpen(false);
      logger.info("Room created:", sanitizedName);
    } catch (error) {
      logger.error("Error creating room:", error);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleSendFriendMessage = (message: string) => {
    if (!selectedFriend) return;

    const sanitizedMessage = sanitizeInput(message);
    if (!validateMessage(sanitizedMessage)) {
      logger.warn("Invalid friend message");
      return;
    }

    try {
      const newMessage: FriendMessage = {
        id: `fm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        friendId: selectedFriend.id,
        senderId: "current-user",
        message: sanitizedMessage,
        timestamp: new Date(),
        isRead: true,
      };

      // TODO: Replace with actual API call
      // await messagesApi.sendFriendMessage(selectedFriend.id, sanitizedMessage);

      setFriendMessages((prev) => ({
        ...prev,
        [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage],
      }));

      setFriends((prev) =>
        prev.map((f) =>
          f.id === selectedFriend.id
            ? {
                ...f,
                lastMessage: sanitizedMessage,
                lastMessageTime: new Date(),
              }
            : f
        )
      );
      logger.info("Friend message sent to:", selectedFriend.id);
    } catch (error) {
      logger.error("Error sending friend message:", error);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLanguage("all");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <RoomTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          friends={friends}
        />

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
              <CreateRoomDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                roomForm={roomForm}
                onInputChange={handleInputChange}
                onSubmit={handleCreateRoom}
              />
            </div>

            <RoomFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onClearFilters={handleClearFilters}
            />

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
                    <Button className="w-full" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div className="flex h-[calc(100vh-12rem)]">
            <FriendsList
              friends={friends}
              selectedFriend={selectedFriend}
              onSelectFriend={handleSelectFriend}
            />
            <FriendChat
              selectedFriend={selectedFriend}
              messages={
                selectedFriend ? friendMessages[selectedFriend.id] || [] : []
              }
              onSendMessage={handleSendFriendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
