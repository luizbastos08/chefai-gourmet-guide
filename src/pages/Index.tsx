
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChatPreview from '@/components/ChatPreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience AI-Powered Cooking</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Try our interactive chat interface and discover how ChefAI can transform your cooking experience.
              </p>
            </div>
            <ChatPreview />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
