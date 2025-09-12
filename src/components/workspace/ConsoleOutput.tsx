import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Monitor, Trash2, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

interface ConsoleMessage {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info' | 'success';
  message: string;
  timestamp: Date;
  source?: string;
}

export function ConsoleOutput() {
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'info',
      message: 'Console ready - Application logs will appear here',
      timestamp: new Date(),
      source: 'system'
    },
    {
      id: '2',
      type: 'log',
      message: 'React application initialized',
      timestamp: new Date(),
      source: 'app'
    }
  ]);
  const [filter, setFilter] = useState<'all' | 'log' | 'warn' | 'error' | 'info'>('all');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simulate real console messages
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleMessages = [
        { type: 'log' as const, message: 'Component rendered successfully', source: 'react' },
        { type: 'info' as const, message: 'State updated: count = 5', source: 'app' },
        { type: 'warn' as const, message: 'Deprecated API usage detected', source: 'app' },
        { type: 'success' as const, message: 'API request completed (200ms)', source: 'network' },
      ];

      // Randomly add a message occasionally
      if (Math.random() > 0.7) {
        const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        addMessage(randomMessage.type, randomMessage.message, randomMessage.source);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addMessage = (type: ConsoleMessage['type'], message: string, source?: string) => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      source
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearConsole = () => {
    setMessages([]);
  };

  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => msg.type === filter);

  const getMessageIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-3 h-3 text-destructive" />;
      case 'warn':
        return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'info':
        return <Info className="w-3 h-3 text-blue-500" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />;
    }
  };

  const getMessageColor = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-destructive';
      case 'warn':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-foreground';
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const messageCounts = {
    all: messages.length,
    log: messages.filter(m => m.type === 'log').length,
    warn: messages.filter(m => m.type === 'warn').length,
    error: messages.filter(m => m.type === 'error').length,
    info: messages.filter(m => m.type === 'info').length,
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-card border-border/50">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          <span className="font-semibold">Console</span>
          <Badge variant="secondary" className="text-xs">
            {filteredMessages.length} messages
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConsole}
            className="h-7 w-7 p-0"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 p-2 border-b border-border/50">
        {(['all', 'log', 'warn', 'error', 'info'] as const).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter(type)}
            className="h-7 text-xs"
          >
            {type} {messageCounts[type] > 0 && `(${messageCounts[type]})`}
          </Button>
        ))}
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-2">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-2 text-sm group hover:bg-accent/20 rounded p-1 -m-1"
            >
              {getMessageIcon(message.type)}
              <div className="flex-1 min-w-0">
                <div className={`font-mono ${getMessageColor(message.type)}`}>
                  {message.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.source && (
                    <Badge variant="outline" className="text-xs h-4">
                      {message.source}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredMessages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              No {filter === 'all' ? '' : filter} messages
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}