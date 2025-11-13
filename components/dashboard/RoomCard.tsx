"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Languages, Users, ArrowRight } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Room } from "@/components/shared/types";

interface RoomCardProps {
  room: Room;
  index: number;
}

export const RoomCard = ({ room, index }: RoomCardProps) => {
  return (
    <motion.div
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
              <CardDescription>{room.description}</CardDescription>
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
                  {room.users.length > 3 && ` +${room.users.length - 3} more`}
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
  );
};
