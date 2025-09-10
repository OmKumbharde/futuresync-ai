import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { 
  Code, 
  FolderOpen, 
  CheckSquare, 
  MessageSquare, 
  Trophy, 
  TrendingUp,
  User,
  Plus,
  Filter,
  Search
} from "lucide-react"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects")

  const mockProjects = [
    {
      id: 1,
      title: "E-commerce API with Node.js",
      description: "Build a REST API for an online store with authentication and payment processing",
      difficulty: "Intermediate",
      tags: ["Node.js", "Express", "MongoDB"],
      progress: 75,
      tasksCompleted: 6,
      totalTasks: 8
    },
    {
      id: 2,
      title: "React Dashboard Component",
      description: "Create a responsive dashboard with charts and data visualization",
      difficulty: "Beginner",
      tags: ["React", "TypeScript", "Chart.js"],
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 5
    }
  ]

  const mockAvailableProjects = [
    {
      id: 3,
      title: "Python Data Analysis Tool",
      description: "Analyze sales data and create insights using pandas and matplotlib",
      difficulty: "Advanced",
      tags: ["Python", "Pandas", "Data Analysis"],
      estimatedWeeks: 3
    },
    {
      id: 4,
      title: "Mobile App with React Native",
      description: "Build a cross-platform mobile app for task management",
      difficulty: "Intermediate",
      tags: ["React Native", "TypeScript", "Mobile"],
      estimatedWeeks: 4
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                SkillSync
              </span>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Student Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <HeroButton variant="hero-ghost" size="default">
              <Plus className="w-4 h-4" />
              New Project
            </HeroButton>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue building your skills and advancing your career.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-muted-foreground">Tasks Completed</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1,250</div>
                  <div className="text-sm text-muted-foreground">XP Points</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-card border border-border">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Leaderboard</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* My Projects */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">My Projects</h2>
                    <HeroButton variant="hero-outline" size="default">
                      <Plus className="w-4 h-4" />
                      Join Project
                    </HeroButton>
                  </div>
                  
                  <div className="space-y-4">
                    {mockProjects.map((project) => (
                      <Card key={project.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-brand group">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {project.description}
                              </p>
                            </div>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                              {project.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress: {project.tasksCompleted}/{project.totalTasks} tasks</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <HeroButton variant="hero" className="w-full">
                            Continue Working
                          </HeroButton>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Available Projects */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Available Projects</h2>
                    <div className="flex items-center gap-2">
                      <HeroButton variant="hero-ghost" size="default">
                        <Filter className="w-4 h-4" />
                      </HeroButton>
                      <HeroButton variant="hero-ghost" size="default">
                        <Search className="w-4 h-4" />
                      </HeroButton>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {mockAvailableProjects.map((project) => (
                      <Card key={project.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-brand group">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {project.description}
                              </p>
                            </div>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                              {project.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            Estimated: {project.estimatedWeeks} weeks
                          </div>
                          
                          <HeroButton variant="hero-outline" className="w-full">
                            Join Project
                          </HeroButton>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
                <p className="text-muted-foreground">Track and manage all your project tasks in one place.</p>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Messages</h2>
                <p className="text-muted-foreground">AI mentor conversations and system notifications.</p>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
                <p className="text-muted-foreground">Your badges, XP, and learning milestones.</p>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
                <p className="text-muted-foreground">See how you rank against other students.</p>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
                <p className="text-muted-foreground">Manage your skills, preferences, and account settings.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Dashboard