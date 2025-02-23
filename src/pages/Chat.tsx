
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send, ChefHat } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type: 'voice' | 'text';
}

const Chat = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Chef assistant. Feel free to speak or type your cooking questions.",
      type: 'voice'
    }
  ]);
  const [textInput, setTextInput] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition logic will be added here
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setMessages(prev => [...prev, {
      role: 'user',
      content: textInput,
      type: 'text'
    }]);
    setTextInput('');
    // AI response logic will be added here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <Card className="max-w-4xl mx-auto h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center space-x-3">
          <ChefHat className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">Chat with ChefAI</h1>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    via {message.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-4">
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="rounded-full w-16 h-16 p-0"
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          </div>

          <form onSubmit={handleSendText} className="flex space-x-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type your message here..."
              className="flex-1"
            />
            <Button type="submit" disabled={!textInput.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
