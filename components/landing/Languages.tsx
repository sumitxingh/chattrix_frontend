"use client";

import { motion } from "framer-motion";

const languages = [
  "English",
  "Spanish",
  "French",
  "Japanese",
  "German",
  "Mandarin",
  "Italian",
  "Portuguese",
  "Russian",
  "Korean",
  "Hindi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Arabic",
  "Turkish",
  "Polish",
  "Dutch",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Greek",
  "Hebrew",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Czech",
  "Hungarian",
  "Romanian",
  "Ukrainian",
  "Bulgarian",
  "Croatian",
];

export const Languages = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Practice 40+ Languages
        </h2>
        <p className="text-muted-foreground text-lg">
          Join rooms for your target language and start practicing today
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {languages.map((lang, index) => (
          <motion.div
            key={lang}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-card border rounded-lg hover:border-primary transition-colors"
          >
            <span className="font-medium">{lang}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

