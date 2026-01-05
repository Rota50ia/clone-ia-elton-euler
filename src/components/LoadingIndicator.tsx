import { Bot, Loader2 } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted border border-primary/30 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" strokeWidth={1.5} />
      </div>
      <div className="chat-bubble-bot px-5 py-3 rounded-2xl">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
