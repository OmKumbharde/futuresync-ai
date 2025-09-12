import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RunResult {
  id: string;
  status: 'running' | 'success' | 'error' | 'stopped';
  output: string;
  errorOutput?: string;
  timestamp: Date;
  duration?: number;
}

export function CodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<RunResult[]>([]);
  const [currentRun, setCurrentRun] = useState<RunResult | null>(null);

  const runCode = async () => {
    setIsRunning(true);
    const startTime = Date.now();
    
    const newRun: RunResult = {
      id: Date.now().toString(),
      status: 'running',
      output: '',
      timestamp: new Date(),
    };
    
    setCurrentRun(newRun);
    
    // Simulate code execution
    try {
      // Simulate compilation/build phase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate execution with output
      const sampleOutputs = [
        "Hello, World!\nApplication started successfully",
        "Counter: 0\nCounter: 1\nCounter: 2\nTask completed!",
        "Loading data...\nData loaded successfully\n✓ All tests passed",
        "Building components...\n✓ Build complete\nServer running on port 3000"
      ];
      
      const randomOutput = sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)];
      const duration = Date.now() - startTime;
      
      const completedRun: RunResult = {
        ...newRun,
        status: 'success',
        output: randomOutput,
        duration,
      };
      
      setCurrentRun(completedRun);
      setResults(prev => [completedRun, ...prev].slice(0, 10)); // Keep last 10 runs
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorRun: RunResult = {
        ...newRun,
        status: 'error',
        output: '',
        errorOutput: 'Runtime error: Cannot read property of undefined\nat App.js:15:23',
        duration,
      };
      
      setCurrentRun(errorRun);
      setResults(prev => [errorRun, ...prev].slice(0, 10));
    } finally {
      setIsRunning(false);
    }
  };

  const stopExecution = () => {
    setIsRunning(false);
    if (currentRun) {
      const stoppedRun: RunResult = {
        ...currentRun,
        status: 'stopped',
        output: currentRun.output + '\n\nExecution stopped by user',
        duration: Date.now() - currentRun.timestamp.getTime(),
      };
      setCurrentRun(stoppedRun);
      setResults(prev => [stoppedRun, ...prev].slice(0, 10));
    }
  };

  const clearResults = () => {
    setResults([]);
    setCurrentRun(null);
  };

  const getStatusColor = (status: RunResult['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-destructive';
      case 'stopped':
        return 'bg-yellow-500';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: RunResult['status']) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-card border-border/50">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          <span className="font-semibold">Code Runner</span>
          {currentRun && (
            <Badge 
              variant="secondary" 
              className={`text-xs ${getStatusColor(currentRun.status)} text-white`}
            >
              {getStatusText(currentRun.status)}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {isRunning ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={stopExecution}
              className="h-7"
            >
              <Square className="w-3 h-3 mr-1" />
              Stop
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={runCode}
              className="h-7"
            >
              <Play className="w-3 h-3 mr-1" />
              Run
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearResults}
            className="h-7 w-7 p-0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
          >
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {currentRun && (
          <div className="p-3 border-b border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Execution</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {currentRun.duration && (
                  <span>{currentRun.duration}ms</span>
                )}
                <span>{currentRun.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
            <ScrollArea className="h-32">
              <div className="font-mono text-sm">
                {currentRun.output && (
                  <div className="text-foreground whitespace-pre-wrap">
                    {currentRun.output}
                  </div>
                )}
                {currentRun.errorOutput && (
                  <div className="text-destructive whitespace-pre-wrap">
                    {currentRun.errorOutput}
                  </div>
                )}
                {isRunning && !currentRun.output && (
                  <div className="text-muted-foreground animate-pulse">
                    Executing code...
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        <div className="flex-1 p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Execution History</span>
            <Badge variant="outline" className="text-xs">
              {results.length} runs
            </Badge>
          </div>
          
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-2 rounded border border-border/50 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(result.status)}`} />
                      <span className="text-xs font-medium">{getStatusText(result.status)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.duration}ms • {result.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate">
                    {result.output || result.errorOutput || 'No output'}
                  </div>
                </div>
              ))}
              {results.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No executions yet. Click "Run" to execute your code.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}