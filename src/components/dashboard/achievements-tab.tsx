import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Star, 
  Award, 
  Target,
  Zap,
  Code,
  Users,
  TrendingUp,
  Lock
} from "lucide-react"

interface Achievement {
  id: number
  code: string
  name: string
  description: string
  icon: React.ReactNode
  xp: number
  earned: boolean
  earnedAt?: string
  progress?: number
  maxProgress?: number
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

interface AchievementsTabProps {
  totalXP: number
  currentLevel: number
  nextLevelXP: number
}

export function AchievementsTab({ totalXP, currentLevel, nextLevelXP }: AchievementsTabProps) {
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all")
  
  const achievements: Achievement[] = [
    {
      id: 1,
      code: "FIRST_STEPS",
      name: "First Steps",
      description: "Complete your first task in any project",
      icon: <Target className="w-6 h-6" />,
      xp: 50,
      earned: true,
      earnedAt: "2024-01-15",
      rarity: "Common"
    },
    {
      id: 2,
      code: "CODE_WARRIOR",
      name: "Code Warrior",
      description: "Write 1000 lines of code",
      icon: <Code className="w-6 h-6" />,
      xp: 100,
      earned: true,
      earnedAt: "2024-01-20",
      progress: 1000,
      maxProgress: 1000,
      rarity: "Rare"
    },
    {
      id: 3,
      code: "BUG_SMASHER",
      name: "Bug Smasher",
      description: "Fix 10 bugs successfully",
      icon: <Zap className="w-6 h-6" />,
      xp: 75,
      earned: true,
      earnedAt: "2024-01-22",
      progress: 10,
      maxProgress: 10,
      rarity: "Common"
    },
    {
      id: 4,
      code: "TEAM_PLAYER",
      name: "Team Player",
      description: "Collaborate on 3 different projects",
      icon: <Users className="w-6 h-6" />,
      xp: 150,
      earned: false,
      progress: 2,
      maxProgress: 3,
      rarity: "Rare"
    },
    {
      id: 5,
      code: "SPEED_DEMON",
      name: "Speed Demon",
      description: "Complete a project in under 2 weeks",
      icon: <TrendingUp className="w-6 h-6" />,
      xp: 200,
      earned: false,
      progress: 0,
      maxProgress: 1,
      rarity: "Epic"
    },
    {
      id: 6,
      code: "PERFECTIONIST",
      name: "Perfectionist",
      description: "Get 100% code review score on 5 submissions",
      icon: <Star className="w-6 h-6" />,
      xp: 300,
      earned: false,
      progress: 1,
      maxProgress: 5,
      rarity: "Epic"
    },
    {
      id: 7,
      code: "LEGEND",
      name: "Coding Legend",
      description: "Complete 10 projects with perfect scores",
      icon: <Trophy className="w-6 h-6" />,
      xp: 500,
      earned: false,
      progress: 0,
      maxProgress: 10,
      rarity: "Legendary"
    },
    {
      id: 8,
      code: "MENTOR",
      name: "Mentor",
      description: "Help 50 other students with their projects",
      icon: <Award className="w-6 h-6" />,
      xp: 400,
      earned: false,
      progress: 0,
      maxProgress: 50,
      rarity: "Legendary"
    }
  ]

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === "earned") return achievement.earned
    if (filter === "locked") return !achievement.earned
    return true
  })

  const earnedCount = achievements.filter(a => a.earned).length
  const totalCount = achievements.length
  const progressToNextLevel = ((totalXP % 1000) / 1000) * 100

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-muted text-muted-foreground"
      case "Rare": return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Epic": return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "Legendary": return "bg-warning/10 text-warning border-warning/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Level {currentLevel}</span>
                <span>Level {currentLevel + 1}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {1000 - (totalXP % 1000)} XP to next level
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">{earnedCount}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1">
              {earnedCount} of {totalCount} achievements
            </div>
            <Progress value={(earnedCount / totalCount) * 100} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">#{Math.floor(Math.random() * 50) + 10}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-success">
            ↑ +3 this week
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Filter:</span>
        <div className="flex gap-2">
          <HeroButton
            variant={filter === "all" ? "hero" : "hero-ghost"}
            size="default"
            onClick={() => setFilter("all")}
          >
            All ({achievements.length})
          </HeroButton>
          <HeroButton
            variant={filter === "earned" ? "hero" : "hero-ghost"}
            size="default"
            onClick={() => setFilter("earned")}
          >
            Earned ({earnedCount})
          </HeroButton>
          <HeroButton
            variant={filter === "locked" ? "hero" : "hero-ghost"}
            size="default"
            onClick={() => setFilter("locked")}
          >
            Locked ({totalCount - earnedCount})
          </HeroButton>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`p-6 bg-gradient-card border-border/50 transition-all duration-300 hover:shadow-brand ${
              achievement.earned ? 'border-primary/20 hover:border-primary/40' : 'opacity-75'
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {achievement.earned ? achievement.icon : <Lock className="w-6 h-6" />}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getRarityColor(achievement.rarity)}`}
                >
                  {achievement.rarity}
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`font-semibold text-lg ${
                  achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>

              {/* Progress */}
              {achievement.progress !== undefined && achievement.maxProgress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-warning" />
                  <span>{achievement.xp} XP</span>
                </div>
                {achievement.earned && achievement.earnedAt && (
                  <div className="text-xs text-muted-foreground">
                    Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <Card className="p-8 text-center bg-gradient-card border-border/50">
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No achievements found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filter or start working on projects to earn achievements.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}