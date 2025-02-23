
import React from 'react';
import { Camera, ChefHat, Clock, Wallet, Dna } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: "AI Pantry Scan",
    description: "Snap, Scan, Serve: Turn random ingredients into perfect meals in seconds.",
    icon: Camera,
  },
  {
    title: "Chef-Level Cooking Coach",
    description: "Step-by-Step Guidance: Follow clear, interactive instructions with timing tips and technique videos when you need them.",
    icon: ChefHat,
  },
  {
    title: "Kitchen Symphony Mode",
    description: "AI-powered timing suggestions help you manage multiple dishes and get everything ready at once.",
    icon: Clock,
  },
  {
    title: "Budget Meal Wizard",
    description: "Eat Like a King on a Ramen Budget",
    icon: Wallet,
  },
  {
    title: "Flavor DNA Profile",
    description: "Recipes That Actually Match Your Taste",
    icon: Dna,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cooking Made Smarter</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how ChefAI transforms your kitchen experience with cutting-edge AI technology.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="group">
                <div className="w-12 h-12 mb-6 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
