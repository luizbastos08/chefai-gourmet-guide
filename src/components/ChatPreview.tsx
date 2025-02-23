
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ChatPreview = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl border border-gray-100">
      <div className="h-[400px] flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold">Chat with ChefAI</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-api-recipes-endpoint>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">Hello! What would you like to cook today?</p>
            </div>
          </div>
          {/* <!-- SUPABASE INTEGRATION POINT --> */}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter ingredients or dish name..." 
              className="flex-1"
            />
            <Button size="icon" className="bg-primary hover:bg-primary-hover">
              <Send className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-gray-500">
              <Image className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatPreview;
