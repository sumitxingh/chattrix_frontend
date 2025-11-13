"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface RoomHeaderProps {
  roomId: string;
  participantsCount: number;
  isInVideoCall: boolean;
  isMuted: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onStartVideoCall: () => void;
  onEndVideoCall: () => void;
  onToggleMute: () => void;
}

export const RoomHeader = ({
  roomId,
  participantsCount,
  isInVideoCall,
  isMuted,
  isSidebarOpen,
  onToggleSidebar,
  onStartVideoCall,
  onEndVideoCall,
  onToggleMute,
}: RoomHeaderProps) => {
  const router = useRouter();

  return (
    <div className="border-b bg-background px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Room {roomId}</h1>
          <p className="text-sm text-muted-foreground">
            {participantsCount} participants
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
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
              onClick={isInVideoCall ? onEndVideoCall : onStartVideoCall}
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
              onClick={onToggleMute}
              className={isMuted ? "text-destructive" : ""}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
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
            <p>Room settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

