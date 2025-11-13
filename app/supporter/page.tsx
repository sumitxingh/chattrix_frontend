"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Crown,
  Sparkles,
  Check,
  ArrowRight,
  Gift,
  Zap,
  Shield,
  Users,
} from "lucide-react";

const supportTiers = [
  {
    name: "Supporter",
    price: "$5",
    period: "month",
    icon: Heart,
    color: "bg-pink-500",
    description: "Show your support and help us grow",
    features: [
      "Supporter badge on your profile",
      "Priority customer support",
      "Early access to new features",
      "Ad-free experience",
      "Custom profile colors",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "$10",
    period: "month",
    icon: Star,
    color: "bg-yellow-500",
    description: "Enhanced features for serious learners",
    features: [
      "Everything in Supporter",
      "Unlimited room creation",
      "Advanced analytics",
      "Video call recording",
      "Language proficiency tracking",
      "Exclusive premium rooms",
    ],
    popular: true,
  },
  {
    name: "Patron",
    price: "$25",
    period: "month",
    icon: Crown,
    color: "bg-purple-500",
    description: "Maximum support with all premium benefits",
    features: [
      "Everything in Premium",
      "Personalized learning path",
      "1-on-1 tutoring sessions (2/month)",
      "Priority feature requests",
      "Dedicated account manager",
      "Exclusive community access",
      "Monthly progress reports",
    ],
    popular: false,
  },
];

const oneTimeOptions = [
  {
    name: "Coffee",
    amount: "$3",
    description: "Buy us a coffee to keep the servers running",
    icon: Gift,
  },
  {
    name: "Lunch",
    amount: "$10",
    description: "Help us improve the platform",
    icon: Zap,
  },
  {
    name: "Dinner",
    amount: "$25",
    description: "Support major feature development",
    icon: Sparkles,
  },
  {
    name: "Custom",
    amount: "Any",
    description: "Choose your own amount",
    icon: Heart,
  },
];

export default function SupporterPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedOneTime, setSelectedOneTime] = useState<string | null>(null);

  const handleSubscribe = (tierName: string) => {
    // TODO: Implement subscription logic
    console.log("Subscribe to:", tierName);
    setSelectedTier(tierName);
    // Redirect to payment page or show payment dialog
  };

  const handleOneTimeDonation = (optionName: string) => {
    // TODO: Implement one-time donation logic
    console.log("One-time donation:", optionName);
    setSelectedOneTime(optionName);
    // Redirect to payment page or show payment dialog
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Become a Supporter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the best language learning platform. Your support
            enables us to add new features, improve the experience, and keep
            Chattrix free for everyone.
          </p>
        </div>

        {/* Why Support Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Support Chattrix?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Free for Everyone</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your support helps us keep the core platform free and
                  accessible to all language learners worldwide.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Faster Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Support enables us to add new features, languages, and
                  improvements faster.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Better Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your contributions help us maintain reliable servers and
                  provide better performance for all users.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Monthly Support Tiers</h2>
            <p className="text-muted-foreground">
              Choose a tier that works for you. Cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <Card
                  key={tier.name}
                  className={`relative ${
                    tier.popular
                      ? "border-2 border-primary shadow-lg scale-105"
                      : "border"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div
                      className={`h-16 w-16 rounded-full ${tier.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">
                        /{tier.period}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(tier.name)}
                    >
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* One-Time Donations */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">One-Time Support</h2>
            <p className="text-muted-foreground">
              Prefer a one-time contribution? Every bit helps!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {oneTimeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.name}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleOneTimeDonation(option.name)}
                >
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{option.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">
                      {option.amount}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {option.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              What Your Support Enables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">New Languages</h3>
                  <p className="text-sm text-muted-foreground">
                    Add more languages to practice and learn from
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Better Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced tools for language learning and practice
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Improved Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Faster servers and better video call quality
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Community Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Expand our community and connect more learners
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can cancel your subscription at any time. You&apos;ll
                continue to have access to premium features until the end of
                your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and other secure
                payment methods.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Will my support be publicly visible?
              </h3>
              <p className="text-sm text-muted-foreground">
                You can choose to display your supporter status on your profile
                or keep it private. The choice is yours!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How is my support used?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your support goes directly towards improving the platform:
                server costs, feature development, new languages, and keeping the
                core platform free for everyone.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have questions about supporting?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

