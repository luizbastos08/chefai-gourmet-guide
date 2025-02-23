
import React from 'react';
import { Camera, Chef, Clock, Save, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    title: "Tell Us What's in Your Kitchen",
    description: "Snap a photo of your fridge/pantry, type in ingredients, or let our app scan your grocery receipts. No fancy tools needed—just tell us what you've got.",
    icon: Camera,
    benefits: [
      "Reduces food waste by using what you already have.",
      "Saves money—no extra shopping required."
    ]
  },
  {
    title: "AI Matches You with Perfect Recipes",
    description: "Our chef analyzes 100,000+ recipes to find dishes that fit your:",
    icon: Chef,
    features: [
      "Ingredients (no missing items!)",
      "Dietary needs (vegan, gluten-free, low-carb, etc.)",
      "Nutrition goals (protein-packed, low-calorie, etc.)",
      "Time & skill level (15-minute meals or gourmet projects)"
    ],
    benefits: [
      "No more scrolling through endless recipes.",
      "Every suggestion is tailored just for you."
    ]
  },
  {
    title: "Cook with Confidence—Step by Step",
    description: "Your AI chef guides you like a pro:",
    icon: Clock,
    features: [
      "Voice & text instructions: Hands-free help while you chop or stir.",
      "Smart timers: Never burn a dish again.",
      "Ingredient swaps: Out of milk? Use almond milk instead.",
      "Budget tips: Cheaper alternatives for pricey items."
    ],
    benefits: [
      "Perfect results, even if you're a beginner.",
      "Learn skills while you cook."
    ]
  },
  {
    title: "Save, Share, and Repeat",
    description: "Love a recipe? Save it to your profile, share it with friends, or let the AI create a grocery list for next time. The more you use it, the smarter your chef gets!",
    icon: Save,
    benefits: [
      "Build a personalized cookbook over time.",
      "Track progress toward your health goals."
    ]
  }
];

const revolutionary = [
  {
    icon: "💰",
    title: "Save money",
    description: "Cook smarter, waste less."
  },
  {
    icon: "🥑",
    title: "Eat healthier",
    description: "No more guesswork—balanced meals every time."
  },
  {
    icon: "⏰",
    title: "Save time",
    description: "Skip the planning, start cooking."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works: Your AI Personal Chef, Made Simple</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover recipes that fit your fridge, your taste, and your life—without the luxury price tag. Here's how your AI-powered chef transforms everyday cooking:
          </p>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{index + 1}. {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {step.features && (
                    <ul className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Why it matters:</p>
                    <ul className="space-y-2">
                      {step.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">→</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Why It's Revolutionary</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {revolutionary.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Kitchen?</h3>
          <p className="text-xl text-gray-600">
            Start cooking smarter today—no sous chef required. <span className="whitespace-nowrap">🍳✨</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
