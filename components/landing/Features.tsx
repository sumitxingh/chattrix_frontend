"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Languages,
  Users,
  MessageCircle,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "Multi-Language Support",
    description:
      "Practice 40+ languages with native speakers and learners from around the world.",
  },
  {
    icon: Users,
    title: "Real-Time Chat",
    description:
      "Join language practice rooms and chat with others in real-time.",
  },
  {
    icon: MessageCircle,
    title: "Interactive Learning",
    description:
      "Engage in conversations, get feedback, and improve your language skills naturally.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Connect with language learners and native speakers from different countries.",
  },
  {
    icon: Zap,
    title: "Instant Communication",
    description:
      "Fast, responsive chat with typing indicators and online status.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description:
      "Moderated rooms with user controls and mute options for a comfortable experience.",
  },
];

export const Features = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-card/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to Learn
        </h2>
        <p className="text-muted-foreground text-lg">
          Powerful features designed for effective language learning
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-2 hover:border-primary transition-colors h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
