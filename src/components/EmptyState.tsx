import { Zap } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="h-full flex items-center justify-center text-center">
      <div className="max-w-md">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <Zap
            className="w-16 h-16 text-primary mx-auto mb-6 relative animate-pulse"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-2xl font-display font-semibold text-primary mb-3 text-glow">
          Sistema Ativo
        </h2>
        <p className="text-muted-foreground text-sm">
          Conectado e pronto para processar suas consultas
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
