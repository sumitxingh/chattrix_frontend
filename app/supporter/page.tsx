"use client";

import { SupporterHero } from "@/components/supporter/Hero";
import { SupportTiers } from "@/components/supporter/SupportTiers";
import { OneTimeDonations } from "@/components/supporter/OneTimeDonations";
import { Benefits } from "@/components/supporter/Benefits";
import { FAQ } from "@/components/supporter/FAQ";
import {
  supportTiers,
  oneTimeDonations,
  benefits,
  faqs,
  SupportTier,
} from "@/data/supporter";
import { logger } from "@/lib/logger";

export default function SupporterPage() {
  const handleSelectTier = async (tier: SupportTier) => {
    try {
      // TODO: Implement payment processing
      // await paymentApi.subscribe(tier.id);
      logger.info("User selected tier:", tier.id);
      // Redirect to payment page or show payment modal
    } catch (error) {
      logger.error("Error selecting tier:", error);
    }
  };

  const handleDonate = async (amount: number) => {
    try {
      if (amount <= 0) {
        logger.warn("Invalid donation amount:", amount);
        return;
      }

      // TODO: Implement donation processing
      // await paymentApi.donate(amount);
      logger.info("Donation amount:", amount);
      // Redirect to payment page or show payment modal
    } catch (error) {
      logger.error("Error processing donation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <SupporterHero />
      <SupportTiers tiers={supportTiers} onSelectTier={handleSelectTier} />
      <OneTimeDonations donations={oneTimeDonations} onDonate={handleDonate} />
      <Benefits benefits={benefits} />
      <FAQ faqs={faqs} />
    </div>
  );
}
