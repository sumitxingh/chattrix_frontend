"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Maximize2,
  Minimize2,
  LogOut,
} from "lucide-react";
import { FriendAvatar } from "@/components/shared/FriendAvatar";
import { RoomUser } from "@/components/shared/types";

interface VideoCallViewProps {
  isActive: boolean;
  users: RoomUser[];
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  remoteVideoRefs: React.RefObject<{ [key: string]: HTMLVideoElement | null }>;
  isVideoOn: boolean;
  isMuted: boolean;
  isScreenSharing: boolean;
  isFullscreen: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleFullscreen: () => void;
  onEndCall: () => void;
}

export const VideoCallView = ({
  isActive,
  users,
  localVideoRef,
  remoteVideoRefs,
  isVideoOn,
  isMuted,
  isScreenSharing,
  isFullscreen,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleFullscreen,
  onEndCall,
}: VideoCallViewProps) => {
  if (!isActive) return null;

  const usersInCall = users.filter((u) => u.isInCall);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 bg-black relative overflow-hidden"
      >
        <div
          className={`grid gap-2 p-2 h-full ${
            usersInCall.length === 1
              ? "grid-cols-1"
              : usersInCall.length === 2
              ? "grid-cols-2"
              : usersInCall.length <= 4
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
                <FriendAvatar
                  user={
                    users.find((u) => u.id === "current-user") || {
                      id: "current-user",
                      username: "you",
                      initials: "YO",
                    }
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
                      if (remoteVideoRefs.current) {
                        remoteVideoRefs.current[user.id] = el;
                      }
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                    <FriendAvatar user={user} size="h-24 w-24" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1 text-white text-sm">
                  {user.username}
                  {user.isMuted && <MicOff className="h-3 w-3 inline ml-1" />}
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
                onClick={onToggleMute}
                className={
                  isMuted
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "text-white hover:bg-white/20"
                }
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
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleVideo}
                className={
                  !isVideoOn
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "text-white hover:bg-white/20"
                }
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
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
                onClick={onToggleScreenShare}
                className={
                  isScreenSharing
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-white hover:bg-white/20"
                }
              >
                {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
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
                onClick={onToggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
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
            onClick={onEndCall}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

