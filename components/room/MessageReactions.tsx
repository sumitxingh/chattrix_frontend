"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MessageReactionsProps {
  reactions: { emoji: string; userIds: string[] }[];
  isOwnMessage: boolean;
  onAddReaction: (emoji: string) => void;
}

export const MessageReactions = ({
  reactions,
  isOwnMessage,
  onAddReaction,
}: MessageReactionsProps) => {
  if (!reactions || reactions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`flex gap-2 mt-1 flex-wrap ${
          isOwnMessage ? "justify-end" : "justify-start"
        }`}
      >
        {reactions.map((reaction, idx) => (
          <motion.button
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            onClick={() => onAddReaction(reaction.emoji)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border hover:bg-accent transition-colors ${
              reaction.userIds.includes("current-user")
                ? "border-primary bg-primary/10"
                : ""
            }`}
          >
            <span className="text-2xl">{reaction.emoji}</span>
            <span className="text-sm font-medium">
              {reaction.userIds.length}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
