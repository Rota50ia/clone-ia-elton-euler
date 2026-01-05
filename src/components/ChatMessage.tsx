import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const ChatMessage = ({ type, content, timestamp }: ChatMessageProps) => {
  const isUser = type === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
          isUser
            ? 'bg-primary/10 border-primary/50'
            : 'bg-gradient-to-br from-secondary to-muted border-primary/30'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
        ) : (
          <Bot className="w-5 h-5 text-primary" strokeWidth={1.5} />
        )}
      </div>

      {/* Message bubble */}
      <div className={`flex-1 max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block px-5 py-3 rounded-2xl ${
            isUser ? 'chat-bubble-user' : 'chat-bubble-bot'
          }`}
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
        </div>
        <p
          className={`text-xs text-muted-foreground/60 mt-1.5 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
