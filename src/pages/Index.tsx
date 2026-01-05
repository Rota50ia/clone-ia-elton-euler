import { useState, useRef, useEffect, FormEvent } from 'react';
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

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: data.response || data.message || JSON.stringify(data),
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
        <div className="text-center mt-4 text-muted-foreground/60 text-xs font-display tracking-wider">
          <p>Sistema de IA • Conectado via N8N</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
