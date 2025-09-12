import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { CLERK_PUBLISHABLE_KEY } from "@/lib/clerk"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { ProjectsTab } from "@/components/dashboard/projects-tab"
import { AchievementsTab } from "@/components/dashboard/achievements-tab"
import { LeaderboardTab } from "@/components/dashboard/leaderboard-tab"
import { useToast } from "@/hooks/use-toast"
import { 
  Code, 
  FolderOpen, 
  CheckSquare, 
  MessageSquare, 
  Trophy, 
  TrendingUp,
  User,
  Plus,
  Bell,
  Settings
} from "lucide-react"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects")
  const { toast } = useToast()

  // User stats
  const [userStats, setUserStats] = useState({
    totalXP: 1250,
    level: 4,
    activeProjects: 2,
    tasksCompleted: 6,
    badges: 4,
    globalRank: 15
  })

  const [myProjects, setMyProjects] = useState([
    {
      id: 1,
      title: "E-commerce API with Node.js",
      description: "Build a REST API for an online store with authentication and payment processing",
      difficulty: "Intermediate" as const,
      tags: ["Node.js", "Express", "MongoDB"],
      progress: 75,
      tasksCompleted: 6,
      totalTasks: 8,
      isEnrolled: true
    },
    {
      id: 2,
      title: "React Dashboard Component",
      description: "Create a responsive dashboard with charts and data visualization",
      difficulty: "Beginner" as const,
      tags: ["React", "TypeScript", "Chart.js"],
      progress: 40,
      tasksCompleted: 2,
      totalTasks: 5,
      isEnrolled: true
    }
  ])

  const [availableProjects] = useState([
    {
      id: 3,
      title: "Python Data Analysis Tool",
      description: "Analyze sales data and create insights using pandas and matplotlib",
      difficulty: "Advanced" as const,
      tags: ["Python", "Pandas", "Data Analysis"],
      estimatedWeeks: 3
    },
    {
      id: 4,
      title: "Mobile App with React Native",
      description: "Build a cross-platform mobile app for task management",
      difficulty: "Intermediate" as const,
      tags: ["React Native", "TypeScript", "Mobile"],
      estimatedWeeks: 4
    },
    {
      id: 5,
      title: "Machine Learning Web App",
      description: "Deploy a machine learning model as a web application using Flask",
      difficulty: "Advanced" as const,
      tags: ["Python", "Flask", "Machine Learning", "TensorFlow"],
      estimatedWeeks: 5
    },
    {
      id: 6,
      title: "Vue.js Portfolio Website",
      description: "Create a modern portfolio website with animations and responsive design",
      difficulty: "Beginner" as const,
      tags: ["Vue.js", "CSS", "JavaScript"],
      estimatedWeeks: 2
    },
    {
      id: 7,
      title: "GraphQL API Development",
      description: "Build a GraphQL API with subscriptions and real-time features",
      difficulty: "Advanced" as const,
      tags: ["GraphQL", "Node.js", "WebSocket"],
      estimatedWeeks: 4
    },
    {
      id: 8,
      title: "DevOps Pipeline Setup",
      description: "Configure CI/CD pipeline with Docker, Jenkins, and AWS deployment",
      difficulty: "Intermediate" as const,
      tags: ["Docker", "Jenkins", "AWS", "DevOps"],
      estimatedWeeks: 3
    }
  ])

  const handleEnrollProject = (projectId: number) => {
    const project = availableProjects.find(p => p.id === projectId)
    if (project) {
      const newProject = {
        ...project,
        progress: 0,
        tasksCompleted: 0,
        totalTasks: Math.floor(Math.random() * 8) + 5,
        isEnrolled: true
      }
      setMyProjects(prev => [...prev, newProject as any])
      setUserStats(prev => ({ ...prev, activeProjects: prev.activeProjects + 1 }))
      
      toast({
        title: "Project Enrolled! 🎉",
        description: `You've successfully joined "${project.title}". Start working on your first task!`,
      })
    }
  }

  const handleContinueProject = (projectId: number) => {
    toast({
      title: "Opening Workspace",
      description: "Redirecting to your project workspace...",
    })
    // In a real app, this would navigate to the workspace
    setTimeout(() => {
      toast({
        title: "Workspace Ready! 💻",
        description: "Your development environment is now active.",
      })
    }, 1500)
  }

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
            <HeroButton 
              variant="hero-ghost" 
              size="default"
              onClick={() => {
                toast({
                  title: "Feature Coming Soon! 🚀",
                  description: "Project creation tools are in development.",
                })
              }}
            >
              <Plus className="w-4 h-4" />
              New Project
            </HeroButton>
            <HeroButton 
              variant="hero-ghost" 
              size="default"
              onClick={() => {
                toast({
                  title: "No new notifications",
                  description: "You're all caught up!",
                })
              }}
            >
              <Bell className="w-4 h-4" />
            </HeroButton>
            {CLERK_PUBLISHABLE_KEY ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">D</span>
              </div>
            )}
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
                  <div className="text-2xl font-bold">{userStats.activeProjects}</div>
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
                  <div className="text-2xl font-bold">{userStats.tasksCompleted}</div>
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
                  <div className="text-2xl font-bold">{userStats.badges}</div>
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
                  <div className="text-2xl font-bold">{userStats.totalXP.toLocaleString()}</div>
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
              <ProjectsTab 
                myProjects={myProjects}
                availableProjects={availableProjects}
                onEnrollProject={handleEnrollProject}
                onContinueProject={handleContinueProject}
              />
            </TabsContent>

            <TabsContent value="tasks">
              <Card className="p-8 text-center bg-gradient-card border-border/50">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Task Management</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Track and manage all your project tasks in one place. Kanban boards, 
                    deadlines, and progress tracking coming soon!
                  </p>
                  <HeroButton 
                    variant="hero"
                    onClick={() => {
                      toast({
                        title: "Feature Coming Soon! 📋",
                        description: "Advanced task management is in development.",
                      })
                    }}
                  >
                    Explore Tasks
                  </HeroButton>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-8 text-center bg-gradient-card border-border/50">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">AI Mentor & Messages</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Get real-time help from your AI mentor, receive project notifications, 
                    and chat with other students in your cohort.
                  </p>
                  <HeroButton 
                    variant="hero"
                    onClick={() => {
                      toast({
                        title: "AI Mentor Online! 🤖",
                        description: "Your personal coding mentor is ready to help.",
                      })
                    }}
                  >
                    Chat with AI Mentor
                  </HeroButton>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <AchievementsTab 
                totalXP={userStats.totalXP}
                currentLevel={userStats.level}
                nextLevelXP={1000}
              />
            </TabsContent>

            <TabsContent value="leaderboard">
              <LeaderboardTab currentUserRank={userStats.globalRank} />
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-8 text-center bg-gradient-card border-border/50">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Profile Settings</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Manage your skills, learning preferences, account settings, 
                    and connect your GitHub and LinkedIn profiles.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <HeroButton 
                      variant="hero"
                      onClick={() => {
                        toast({
                          title: "Profile Settings",
                          description: "Opening your profile management...",
                        })
                      }}
                    >
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </HeroButton>
                    <HeroButton 
                      variant="hero-outline"
                      onClick={() => {
                        toast({
                          title: "Skills Assessment",
                          description: "Take a quick skills assessment to improve project matching.",
                        })
                      }}
                    >
                      Skills Assessment
                    </HeroButton>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Dashboard