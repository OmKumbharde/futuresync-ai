import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ProjectSidebar, type WorkspaceProject } from "@/components/workspace/ProjectSidebar";
import { KanbanBoard } from "@/components/workspace/KanbanBoard";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import { ArrowLeft } from "lucide-react";

const defaultFiles: Record<string, string> = {
  "/index.js": `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './styles.css';\n\ncreateRoot(document.getElementById('root')).render(<App />);\n`,
  "/App.js": `import React, { useState } from 'react';\nexport default function App(){\n  const [count, setCount] = useState(0);\n  return (\n    <div className="app">\n      <h1>SkillSync Workspace</h1>\n      <p>Edit code on the left, see live preview here. </p>\n      <button onClick={() => setCount((c) => c + 1)}>Clicks: {count}</button>\n    </div>\n  );\n}`,
  "/styles.css": `:root {\n  --bg: #0b0e14;\n  --fg: #e6e6e6;\n  --primary: #7c3aed;\n}\nbody { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; background: var(--bg); color: var(--fg);}\n.app { padding: 24px; }\nbutton { background: var(--primary); color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer;}\nbutton:hover { opacity: .9 }`,
};

export default function Workspace() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const projectFromState: WorkspaceProject | undefined = location.state?.project;

  const project: WorkspaceProject = useMemo(() => {
    if (projectFromState) return projectFromState;
    // Fallback demo project based on id
    const id = Number(projectId ?? 0) || 1;
    return {
      id,
      title: `Project #${id}`,
      description: "Interactive workspace with editor and live preview.",
      difficulty: (id % 3 === 0 ? "Advanced" : id % 2 === 0 ? "Intermediate" : "Beginner") as WorkspaceProject['difficulty'],
      tags: ["React", "TypeScript", "UI"],
      progress: 10 + (id % 5) * 10,
      tasksCompleted: 2,
      totalTasks: 8,
      students: 42,
      rating: 4.7,
    };
  }, [projectFromState, projectId]);

  useEffect(() => {
    document.title = `${project.title} | SkillSync Workspace`;
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.href);
    if (!canonical.parentNode) document.head.appendChild(canonical);
  }, [project.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeroButton variant="hero-ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4" /> Back
            </HeroButton>
            <h1 className="text-xl md:text-2xl font-bold">{project.title}</h1>
            <Badge variant={
              project.difficulty === 'Beginner' ? 'secondary' : project.difficulty === 'Intermediate' ? 'default' : 'destructive'
            }>
              {project.difficulty}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">Workspace • Live preview updates on save</div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        <ResizablePanelGroup direction="horizontal" className="rounded-lg border border-border overflow-hidden">
          <ResizablePanel defaultSize={22} minSize={18} maxSize={30} className="bg-card/50">
            <ProjectSidebar project={project} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            <SandpackProvider template="react" files={defaultFiles} options={{ externalResources: [] }}>
              <SandpackLayout style={{ height: 540 }}>
                <SandpackFileExplorer style={{ minWidth: 180 }} />
                <SandpackCodeEditor showTabs showRunButton={false} showLineNumbers style={{ minWidth: 280 }} />
                <SandpackPreview showOpenInCodeSandbox />
              </SandpackLayout>
            </SandpackProvider>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={38} minSize={25} className="bg-card/50">
            <div className="h-full p-4 space-y-3 overflow-y-auto">
              <Card className="p-4 bg-gradient-card border-border/50">
                <h3 className="font-semibold mb-2">Project Activity</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Initialized workspace</li>
                  <li>Edited App.js (demo)</li>
                  <li>Live preview refreshed</li>
                </ul>
              </Card>
              <Card className="p-4 bg-gradient-card border-border/50">
                <h3 className="font-semibold mb-2">Environment</h3>
                <div className="text-sm text-muted-foreground">React runtime in-browser via Sandpack (demo).</div>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Task Board</h2>
          </div>
          <KanbanBoard />
        </section>
      </main>
    </div>
  );
}
