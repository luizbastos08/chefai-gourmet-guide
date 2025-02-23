
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4 min-h-[90vh] flex items-center bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Personal
            <span className="text-primary"> AI Chef</span>
            <br />
            Always Ready to Help
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your cooking experience with crafted recipes, smart suggestions, and step-by-step guidance. Perfect meals, every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-white min-w-[200px]"
              onClick={() => navigate('/chat')}
            >
              Start Cooking Now
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
