"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OneTimeDonation } from "@/data/supporter";
import { useState } from "react";

interface OneTimeDonationsProps {
  donations: OneTimeDonation[];
  onDonate: (amount: number) => void;
}

export const OneTimeDonations = ({
  donations,
  onDonate,
}: OneTimeDonationsProps) => {
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = (donation: OneTimeDonation) => {
    if (donation.id === "donation-custom") {
      const amount = parseFloat(customAmount);
      if (amount > 0) {
        onDonate(amount);
        setCustomAmount("");
      }
    } else {
      onDonate(donation.amount);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-card/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          One-Time Donation
        </h2>
        <p className="text-muted-foreground text-lg">
          Make a one-time contribution to support Chattrix
        </p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Choose an Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {donations.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {donation.id === "donation-custom" ? (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                      className="text-center"
                    />
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleDonate(donation)}
                      disabled={!customAmount || parseFloat(customAmount) <= 0}
                    >
                      Donate
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleDonate(donation)}
                  >
                    {donation.label}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

