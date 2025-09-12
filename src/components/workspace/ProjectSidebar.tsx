import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Users, Star, Clock, BookOpen, Share2, FolderGit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface WorkspaceProject {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  progress?: number;
  tasksCompleted?: number;
  totalTasks?: number;
  students?: number;
  rating?: number;
}

interface ProjectSidebarProps {
  project: WorkspaceProject;
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  const { toast } = useToast();
  const completion = useMemo(() => {
    const p = project.progress ?? 0;
    return Math.min(Math.max(p, 0), 100);
  }, [project.progress]);

  return (
    <div className="h-full overflow-y-auto space-y-6 p-4">
      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold leading-tight">{project.title}</h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{project.description}</p>
          </div>
          <Badge variant={
            project.difficulty === "Beginner"
              ? "secondary"
              : project.difficulty === "Intermediate" ? "default" : "destructive"
          }>
            {project.difficulty}
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.tasksCompleted ?? 0} tasks</span>
            <span>{project.totalTasks ?? 0} total</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {project.students ?? 24}
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-warning" />
            {(project.rating ?? 4.6).toFixed(1)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Active
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-2xs">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <HeroButton
            variant="hero"
            onClick={() =>
              toast({ title: "Docs", description: "Opening project docs (demo)..." })
            }
          >
            <BookOpen className="w-4 h-4" /> Docs
          </HeroButton>
          <HeroButton
            variant="hero-outline"
            onClick={() =>
              toast({ title: "Invite", description: "Invite sent to teammate (demo)." })
            }
          >
            <Share2 className="w-4 h-4" /> Invite
          </HeroButton>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card border-border/50">
        <h3 className="font-semibold mb-3">Repository</h3>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FolderGit2 className="w-4 h-4" />
            github.com/skillsync/demo
          </div>
          <HeroButton
            variant="hero-ghost"
            onClick={() => toast({ title: "Repository", description: "Opening repo (demo)..." })}
          >
            Open
          </HeroButton>
        </div>
        <Separator className="my-3" />
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Last Commit</span>
            <span>2h ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Branch</span>
            <span>main</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
