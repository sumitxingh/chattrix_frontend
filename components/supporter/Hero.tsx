"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const SupporterHero = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Heart className="h-16 w-16 text-primary mx-auto fill-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Become a Supporter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Help us keep Chattrix free and accessible for everyone. Your support
          helps us maintain the platform and add new features.
        </motion.p>
      </div>
    </section>
  );
};

