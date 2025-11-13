"use client";

import { Hero } from "@/components/landing/Hero";
import { Languages } from "@/components/landing/Languages";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Hero />
      <Languages />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}
