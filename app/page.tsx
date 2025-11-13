"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "Multi-Language Support",
    description:
      "Practice 10+ languages with native speakers and learners from around the world.",
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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Language Learner",
    content:
      "Chattrix helped me improve my Spanish conversation skills significantly. The real-time practice is amazing!",
    rating: 5,
  },
  {
    name: "Marco Rossi",
    role: "Italian Native Speaker",
    content:
      "I love helping others learn Italian while practicing my English. Great community!",
    rating: 5,
  },
  {
    name: "Emma Johnson",
    role: "French Student",
    content:
      "The best way to practice French outside of class. The rooms are well-organized and friendly.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            Practice Languages with Real People
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Join language practice rooms, chat with native speakers, and improve
            your skills through real conversations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted-foreground mt-4"
          >
            No credit card required • Free forever
          </motion.p>
        </div>
      </section>

      {/* Languages Section */}
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

      {/* Features Section */}
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

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Get started in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Account</h3>
            <p className="text-muted-foreground">
              Sign up for free and create your profile in seconds
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Join or Create Rooms</h3>
            <p className="text-muted-foreground">
              Browse language rooms or create your own practice space
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Practicing</h3>
            <p className="text-muted-foreground">
              Chat with others, get feedback, and improve your skills
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-card/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Language Learners
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our community has to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-base">
                  {testimonial.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-blue-500/5">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl mb-4">
              Ready to Start Learning?
            </CardTitle>
            <CardDescription className="text-lg">
              Join thousands of language learners practicing together
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>10+ languages</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
