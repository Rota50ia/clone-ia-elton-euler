import { useState, useRef, useEffect, FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import ChatAvatar from '@/components/ChatAvatar';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import LoadingIndicator from '@/components/LoadingIndicator';
import EmptyState from '@/components/EmptyState';
import BackgroundEffects from '@/components/BackgroundEffects';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'clone-ia-chat-history';
const THREAD_KEY = 'clone-ia-thread-id';

const loadMessages = (): Message[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveMessages = (messages: Message[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
};

const loadThreadId = (): string | null => {
  try {
    return localStorage.getItem(THREAD_KEY);
  } catch {
    return null;
  }
};

const saveThreadId = (threadId: string) => {
  try {
    localStorage.setItem(THREAD_KEY, threadId);
  } catch (error) {
    console.error('Failed to save threadId:', error);
  }
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [threadId, setThreadId] = useState<string | null>(loadThreadId);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    setThreadId(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(THREAD_KEY);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages((prev) => [
      ...prev,
      { type: 'user', content: userMessage, timestamp: getCurrentTime() },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://edilson-dark-n8n.7lvlou.easypanel.host/webhook/clone_ia_elton_euler',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            threadId: threadId,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();

      // Save threadId if returned
      if (data.threadId) {
        setThreadId(data.threadId);
        saveThreadId(data.threadId);
      }

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: data.output || data.response || data.message || JSON.stringify(data),
          timestamp: getCurrentTime(),
        },
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content:
            'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
          timestamp: getCurrentTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <BackgroundEffects />

      <div className="w-full max-w-4xl h-[95vh] flex flex-col">
        {/* Header with Avatar */}
        <div className="mb-8">
          <ChatAvatar />
        </div>

        {/* Chat Container */}
        <div className="flex-1 gradient-card rounded-3xl border border-border box-glow overflow-hidden flex flex-col backdrop-blur-sm">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  type={msg.type}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))
            )}

            {isLoading && <LoadingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <p className="text-muted-foreground/60 text-xs font-display tracking-wider">
            Sistema de IA • Conectado via N8N
          </p>
          {messages.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/40 hover:text-destructive transition-colors"
              title="Limpar histórico"
            >
              <Trash2 className="w-3 h-3" />
              Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
