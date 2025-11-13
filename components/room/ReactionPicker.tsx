"use client";

import { AnimatePresence, motion } from "framer-motion";
import { emojiReactions } from "@/components/shared/constants";

interface ReactionPickerProps {
  messageId: string;
  isVisible: boolean;
  onAddReaction: (messageId: string, emoji: string) => void;
}

export const ReactionPicker = ({
  messageId,
  isVisible,
  onAddReaction,
}: ReactionPickerProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
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
              transition={{ delay: idx * 0.05, type: "spring" }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddReaction(messageId, emoji)}
              className="text-2xl p-1"
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
