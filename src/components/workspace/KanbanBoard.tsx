import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type KanbanStatus = "Backlog" | "In Progress" | "Review" | "Done";

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: KanbanStatus;
  assignee?: string;
  points?: number;
  tags?: string[];
}

interface KanbanBoardProps {
  initialTasks?: KanbanTask[];
  onChange?: (tasks: KanbanTask[]) => void;
}

const STATUSES: KanbanStatus[] = ["Backlog", "In Progress", "Review", "Done"];

export function KanbanBoard({ initialTasks, onChange }: KanbanBoardProps) {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<KanbanTask[]>(
    initialTasks ?? [
      { id: "t1", title: "Setup project structure", status: "Backlog", points: 2, tags: ["setup"] },
      { id: "t2", title: "Implement authentication", status: "In Progress", points: 5, tags: ["auth", "api"] },
      { id: "t3", title: "Design Kanban board UI", status: "Review", points: 3, tags: ["ui"] },
      { id: "t4", title: "Write unit tests", status: "Backlog", points: 2, tags: ["tests"] },
      { id: "t5", title: "Deploy preview", status: "Done", points: 1, tags: ["devops"] },
    ]
  );

  const columns = useMemo(() => {
    return STATUSES.map((s) => ({
      status: s,
      items: tasks.filter((t) => t.status === s),
    }));
  }, [tasks]);

  const moveTask = (id: string, direction: -1 | 1) => {
    setTasks((prev) => {
      const next = prev.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUSES.indexOf(t.status);
        const newIdx = Math.min(Math.max(idx + direction, 0), STATUSES.length - 1);
        const updated = { ...t, status: STATUSES[newIdx] };
        if (updated.status === t.status) return t;
        toast({ title: "Task moved", description: `Moved to ${updated.status}` });
        return updated;
      });
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => (
        <Card key={col.status} className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{col.status}</h3>
            <Badge variant="secondary">{col.items.length}</Badge>
          </div>
          <Separator className="mb-3" />
          <div className="space-y-3 min-h-[120px]">
            {col.items.map((task) => (
              <div key={task.id} className="p-3 rounded-lg border bg-card/50 border-border hover:border-primary/30 hover:shadow-brand transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{task.title}</div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-2xs">{task.points ?? 1} pts</Badge>
                </div>
                {task.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {task.tags.map((tg) => (
                      <Badge key={tg} variant="outline" className="text-2xs">{tg}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <HeroButton
                    variant="hero-ghost"
                    size="default"
                    onClick={() => moveTask(task.id, -1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </HeroButton>
                  <HeroButton
                    variant="hero-ghost"
                    size="default"
                    onClick={() => moveTask(task.id, 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </HeroButton>
                </div>
              </div>
            ))}
            {col.items.length === 0 && (
              <div className="text-sm text-muted-foreground">No tasks</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
