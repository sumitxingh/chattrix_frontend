"use client";

export const HowItWorks = () => {
  return (
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
  );
};
