import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, CookingPot, Volume2, VolumeX, ImagePlus, AudioWaveform } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'voice' | 'text' | 'image';
  audioUrl?: string;
  imageUrl?: string;
}

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  audioContext: AudioContext | null;
  audioQueue: ArrayBuffer[];
}

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Chef assistant. Feel free to speak or type your cooking questions.",
      type: 'voice'
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: true,
    audioContext: null,
    audioQueue: []
  });

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setVoiceState(prev => ({
          ...prev,
          audioContext: new AudioContext(),
          isListening: true
        }));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please enable microphone access to use voice features."
        });
      }
    };

    requestMicrophonePermission();

    return () => {
      voiceState.audioContext?.close();
    };
  }, []);

  const toggleListening = async () => {
    if (voiceState.isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = async () => {
    try {
      setVoiceState(prev => ({ ...prev, isListening: true }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start voice recognition."
      });
    }
  };

  const stopListening = () => {
    setVoiceState(prev => ({ ...prev, isListening: false }));
  };

  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textInput,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setTextInput('');
    await processUserInput(newMessage);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos de imagem."
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB."
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: 'Imagem enviada',
      type: 'image',
      imageUrl: URL.createObjectURL(file)
    };

    setMessages(prev => [...prev, newMessage]);
    await processUserInput(newMessage);
  };

  const processUserInput = async (message: Message) => {
    try {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Processando sua solicitação...',
        type: 'voice'
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Here we'll make the API call to Supabase Edge Function
      // which will handle both the chat response and voice synthesis
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao processar sua solicitação."
      });
    }
  };

  const playAudioResponse = async (audioUrl: string) => {
    try {
      if (!voiceState.audioContext) return;
      setVoiceState(prev => ({ ...prev, isSpeaking: true }));

      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await voiceState.audioContext.decodeAudioData(arrayBuffer);
      
      const source = voiceState.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(voiceState.audioContext.destination);
      
      source.onended = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      };

      source.start(0);
    } catch (error) {
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to play audio response."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <Card className="max-w-4xl mx-auto h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CookingPot className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Chat with ChefAI</h1>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className={`text-gray-500 hover:bg-gray-100 transition-colors ${
              !voiceState.isSpeaking ? 'text-red-500' : ''
            }`}
            onClick={() => setVoiceState(prev => ({ 
              ...prev, 
              isSpeaking: !prev.isSpeaking,
              audioQueue: [] 
            }))}
          >
            {voiceState.isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.type === 'image' && message.imageUrl ? (
                    <img 
                      src={message.imageUrl} 
                      alt="Imagem enviada" 
                      className="rounded-lg max-w-full h-auto mb-2"
                    />
                  ) : (
                    <p>{message.content}</p>
                  )}
                  {message.audioUrl && message.role === 'assistant' && (
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => playAudioResponse(message.audioUrl!)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-4">
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={voiceState.isListening ? "default" : "secondary"}
              className={`rounded-full w-16 h-16 p-0 transition-transform ${
                voiceState.isListening ? 'animate-pulse bg-primary' : 'bg-red-100'
              }`}
              onClick={toggleListening}
            >
              <AudioWaveform className={`w-6 h-6 ${
                voiceState.isListening 
                  ? 'text-white animate-pulse' 
                  : 'text-red-500'
              }`} />
            </Button>
          </div>

          <form onSubmit={handleSendText} className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <ImagePlus className="h-4 w-4" />
              </Button>
            </label>
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Ou digite sua mensagem aqui..."
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
