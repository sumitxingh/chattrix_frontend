"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";

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

export const Testimonials = () => {
  return (
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
  );
};
