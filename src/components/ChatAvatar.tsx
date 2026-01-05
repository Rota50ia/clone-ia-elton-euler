import { Bot } from 'lucide-react';

const ChatAvatar = () => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Outer pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 rounded-full border border-primary/20 pulse-ring" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border-2 border-primary/30 animate-pulse" />
      </div>
      
      {/* Main avatar */}
      <div className="relative w-48 h-48 avatar-ring bg-gradient-to-br from-secondary to-background flex items-center justify-center float-animation">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
        <Bot className="w-24 h-24 text-primary" strokeWidth={1.5} />
        
        {/* Status indicator */}
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-primary rounded-full animate-glow" />
      </div>
      
      {/* Title */}
      <h1 className="text-3xl font-display font-bold text-primary mt-6 tracking-wider text-glow">
        CLONE IA
      </h1>
      <p className="text-muted-foreground text-sm mt-1 tracking-[0.3em] font-display">
        ELTON EULER
      </p>
    </div>
  );
};

export default ChatAvatar;
