import { Send } from 'lucide-react';
import { FormEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ value, onChange, onSubmit, isLoading }: ChatInputProps) => {
  return (
    <div className="border-t border-border p-4 bg-gradient-to-b from-transparent to-background/50">
      <form onSubmit={onSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Digite sua consulta..."
            disabled={isLoading}
            className="w-full px-6 py-4 rounded-full input-glow focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="absolute inset-0 rounded-full bg-primary/5 pointer-events-none" />
        </div>
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="btn-send p-4 rounded-full"
          aria-label="Enviar mensagem"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
