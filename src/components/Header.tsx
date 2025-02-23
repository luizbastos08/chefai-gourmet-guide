
import React from 'react';
import { CookingPot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm fixed top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CookingPot className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">ChefAI</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How It Works</a>
          <Button variant="ghost" className="text-primary hover:text-primary-hover">Sign In</Button>
          <Button className="bg-primary hover:bg-primary-hover text-white">Get Started</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
