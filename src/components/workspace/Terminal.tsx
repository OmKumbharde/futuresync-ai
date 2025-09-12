import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal as TerminalIcon, Play, Square, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'success',
      content: 'SkillSync Terminal v1.0.0 - Ready for development!',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" to see available commands',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setLines(prev => [...prev, newLine]);
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to terminal
    addLine('command', `$ ${command}`);
    setIsRunning(true);

    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Handle different commands
    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'help') {
      addLine('output', 'Available commands:');
      addLine('output', '  npm install <package>  - Install npm package');
      addLine('output', '  npm run dev           - Start development server');
      addLine('output', '  npm run build         - Build project');
      addLine('output', '  npm run test          - Run tests');
      addLine('output', '  clear                 - Clear terminal');
      addLine('output', '  ls                    - List files');
      addLine('output', '  help                  - Show this help');
    } else if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === 'ls') {
      addLine('output', 'src/');
      addLine('output', 'public/');
      addLine('output', 'package.json');
      addLine('output', 'README.md');
    } else if (cmd.startsWith('npm install')) {
      const packageName = cmd.replace('npm install', '').trim();
      if (packageName) {
        addLine('output', `Installing ${packageName}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        addLine('success', `✓ ${packageName} installed successfully`);
      } else {
        addLine('error', 'Please specify a package name');
      }
    } else if (cmd === 'npm run dev') {
      addLine('output', 'Starting development server...');
      await new Promise(resolve => setTimeout(resolve, 800));
      addLine('success', '✓ Development server started on http://localhost:3000');
    } else if (cmd === 'npm run build') {
      addLine('output', 'Building project...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      addLine('success', '✓ Build completed successfully');
      addLine('output', 'Output directory: dist/');
    } else if (cmd === 'npm run test') {
      addLine('output', 'Running tests...');
      await new Promise(resolve => setTimeout(resolve, 900));
      addLine('success', '✓ All tests passed (5/5)');
    } else {
      addLine('error', `Command not found: ${command}`);
      addLine('output', 'Type "help" to see available commands');
    }

    setIsRunning(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isRunning) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      // In a real app, this would cycle through command history
      e.preventDefault();
    }
  };

  const clearTerminal = () => {
    setLines([]);
  };

  const stopExecution = () => {
    setIsRunning(false);
    addLine('error', '^C Process interrupted');
  };

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <Card className="h-full flex flex-col bg-gradient-card border-border/50">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="font-semibold">Terminal</span>
          {isRunning && <Badge variant="secondary" className="text-xs">Running</Badge>}
        </div>
        <div className="flex items-center gap-1">
          {isRunning ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={stopExecution}
              className="h-7 w-7 p-0"
            >
              <Square className="w-3 h-3" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => inputRef.current?.focus()}
              className="h-7 w-7 p-0"
            >
              <Play className="w-3 h-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTerminal}
            className="h-7 w-7 p-0"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="font-mono text-sm space-y-1">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap ${
                line.type === 'command'
                  ? 'text-primary font-medium'
                  : line.type === 'error'
                  ? 'text-destructive'
                  : line.type === 'success'
                  ? 'text-green-500'
                  : 'text-muted-foreground'
              }`}
            >
              {line.content}
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-primary">$</span>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command..."
            className="font-mono text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isRunning}
          />
        </div>
      </form>
    </Card>
  );
}