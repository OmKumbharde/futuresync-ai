import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  TrendingUp, 
  Star, 
  Award,
  Users,
  Zap,
  Calendar,
  Target
} from "lucide-react"

interface LeaderboardEntry {
  id: number
  name: string
  avatar?: string
  xp: number
  level: number
  rank: number
  change: number
  badges: number
  streak: number
  projectsCompleted: number
  isCurrentUser?: boolean
}

interface LeaderboardTabProps {
  currentUserRank: number
}

export function LeaderboardTab({ currentUserRank }: LeaderboardTabProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "all-time">("weekly")
  
  const weeklyLeaderboard: LeaderboardEntry[] = [
    { id: 1, name: "Alex Chen", xp: 2150, level: 8, rank: 1, change: 2, badges: 12, streak: 7, projectsCompleted: 3 },
    { id: 2, name: "Sarah Rodriguez", xp: 1980, level: 7, rank: 2, change: -1, badges: 10, streak: 5, projectsCompleted: 4 },
    { id: 3, name: "Michael Kim", xp: 1875, level: 7, rank: 3, change: 1, badges: 9, streak: 12, projectsCompleted: 2 },
    { id: 4, name: "Emma Johnson", xp: 1720, level: 6, rank: 4, change: 0, badges: 8, streak: 3, projectsCompleted: 3 },
    { id: 5, name: "David Wilson", xp: 1650, level: 6, rank: 5, change: 3, badges: 7, streak: 1, projectsCompleted: 2 },
    { id: 6, name: "Lisa Zhang", xp: 1590, level: 6, rank: 6, change: -2, badges: 9, streak: 8, projectsCompleted: 4 },
    { id: 7, name: "James Brown", xp: 1520, level: 5, rank: 7, change: 1, badges: 6, streak: 4, projectsCompleted: 2 },
    { id: 8, name: "Maria Garcia", xp: 1480, level: 5, rank: 8, change: -1, badges: 8, streak: 2, projectsCompleted: 3 },
    { id: 9, name: "John Smith", xp: 1420, level: 5, rank: 9, change: 2, badges: 5, streak: 6, projectsCompleted: 1 },
    { id: 10, name: "You", xp: 1250, level: 4, rank: currentUserRank, change: 4, badges: 4, streak: 3, projectsCompleted: 2, isCurrentUser: true },
  ]

  const monthlyLeaderboard: LeaderboardEntry[] = [
    { id: 1, name: "Sarah Rodriguez", xp: 8950, level: 12, rank: 1, change: 1, badges: 18, streak: 15, projectsCompleted: 8 },
    { id: 2, name: "Alex Chen", xp: 8720, level: 11, rank: 2, change: -1, badges: 16, streak: 22, projectsCompleted: 7 },
    { id: 3, name: "Michael Kim", xp: 8350, level: 11, rank: 3, change: 2, badges: 15, streak: 18, projectsCompleted: 6 },
    { id: 4, name: "Emma Johnson", xp: 7980, level: 10, rank: 4, change: 0, badges: 14, streak: 9, projectsCompleted: 9 },
    { id: 5, name: "Lisa Zhang", xp: 7750, level: 10, rank: 5, change: 1, badges: 17, streak: 12, projectsCompleted: 8 },
    { id: 6, name: "David Wilson", xp: 7520, level: 9, rank: 6, change: -2, badges: 13, streak: 5, projectsCompleted: 5 },
    { id: 7, name: "James Brown", xp: 7280, level: 9, rank: 7, change: 1, badges: 12, streak: 7, projectsCompleted: 6 },
    { id: 8, name: "Maria Garcia", xp: 7150, level: 9, rank: 8, change: 0, badges: 16, streak: 14, projectsCompleted: 7 },
    { id: 9, name: "John Smith", xp: 6890, level: 8, rank: 9, change: 3, badges: 11, streak: 8, projectsCompleted: 4 },
    { id: 10, name: "You", xp: 5750, level: 7, rank: currentUserRank + 5, change: 8, badges: 8, streak: 11, projectsCompleted: 4, isCurrentUser: true },
  ]

  const allTimeLeaderboard: LeaderboardEntry[] = [
    { id: 1, name: "Sarah Rodriguez", xp: 25750, level: 18, rank: 1, change: 0, badges: 35, streak: 45, projectsCompleted: 18 },
    { id: 2, name: "Michael Kim", xp: 24980, level: 17, rank: 2, change: 1, badges: 32, streak: 38, projectsCompleted: 16 },
    { id: 3, name: "Alex Chen", xp: 24520, level: 17, rank: 3, change: -1, badges: 30, streak: 42, projectsCompleted: 15 },
    { id: 4, name: "Emma Johnson", xp: 23750, level: 16, rank: 4, change: 0, badges: 28, streak: 25, projectsCompleted: 20 },
    { id: 5, name: "Lisa Zhang", xp: 22980, level: 16, rank: 5, change: 1, badges: 33, streak: 31, projectsCompleted: 17 },
    { id: 6, name: "David Wilson", xp: 22350, level: 15, rank: 6, change: -1, badges: 26, streak: 18, projectsCompleted: 14 },
    { id: 7, name: "James Brown", xp: 21890, level: 15, rank: 7, change: 2, badges: 24, streak: 22, projectsCompleted: 13 },
    { id: 8, name: "Maria Garcia", xp: 21520, level: 14, rank: 8, change: 0, badges: 29, streak: 28, projectsCompleted: 16 },
    { id: 9, name: "John Smith", xp: 20750, level: 14, rank: 9, change: -2, badges: 22, streak: 15, projectsCompleted: 12 },
    { id: 10, name: "You", xp: 18250, level: 12, rank: currentUserRank + 12, change: 5, badges: 18, streak: 20, projectsCompleted: 10, isCurrentUser: true },
  ]

  const getCurrentLeaderboard = () => {
    switch (period) {
      case "weekly": return weeklyLeaderboard
      case "monthly": return monthlyLeaderboard
      case "all-time": return allTimeLeaderboard
    }
  }

  const leaderboard = getCurrentLeaderboard()
  const currentUser = leaderboard.find(entry => entry.isCurrentUser)
  const topThree = leaderboard.slice(0, 3)
  const restOfLeaderboard = leaderboard.slice(3)

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />
    if (change < 0) return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />
    return <div className="w-4 h-4 rounded-full bg-muted" />
  }

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`
    if (change < 0) return change.toString()
    return "—"
  }

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <Tabs value={period} onValueChange={(value) => setPeriod(value as "weekly" | "monthly" | "all-time")}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Leaderboard</h2>
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={period} className="space-y-6">
          {/* Your Rank Card */}
          {currentUser && (
            <Card className="p-6 bg-gradient-brand/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold">
                    #{currentUser.rank}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Rank</h3>
                    <p className="text-muted-foreground">
                      Level {currentUser.level} • {currentUser.xp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getChangeIcon(currentUser.change)}
                    <span className={`text-sm font-medium ${
                      currentUser.change > 0 ? 'text-success' : 
                      currentUser.change < 0 ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {getChangeText(currentUser.change)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs last {period === "all-time" ? "month" : period.replace("-", " ")}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Top 3 Podium */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              Top Performers
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topThree.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`text-center p-4 rounded-xl border transition-all duration-300 hover:shadow-brand ${
                    index === 0 ? 'bg-warning/5 border-warning/20' :
                    index === 1 ? 'bg-muted/50 border-border' :
                    'bg-accent/5 border-accent/20'
                  }`}
                >
                  <div className="relative inline-block mb-3">
                    <Avatar className="w-16 h-16 border-2 border-background">
                      <AvatarFallback className="text-lg font-bold">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-warning text-warning-foreground' :
                      index === 1 ? 'bg-muted text-muted-foreground' :
                      'bg-accent text-accent-foreground'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="font-semibold">{entry.name}</h4>
                  <p className="text-sm text-muted-foreground">Level {entry.level}</p>
                  <p className="text-lg font-bold text-primary">{entry.xp.toLocaleString()} XP</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {entry.badges}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {entry.streak}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Full Leaderboard */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-lg font-semibold mb-4">Full Rankings</h3>
            <div className="space-y-3">
              {restOfLeaderboard.map((entry) => (
                <div 
                  key={entry.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:shadow-brand ${
                    entry.isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-card/50 border-border hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      #{entry.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-sm">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className={`font-medium ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                        {entry.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Level {entry.level} • {entry.xp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Award className="w-3 h-3" />
                        {entry.badges}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Zap className="w-3 h-3" />
                        {entry.streak}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target className="w-3 h-3" />
                        {entry.projectsCompleted}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getChangeIcon(entry.change)}
                      <span className={`text-sm font-medium ${
                        entry.change > 0 ? 'text-success' : 
                        entry.change < 0 ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {getChangeText(entry.change)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats Summary */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{leaderboard.length * 50}+</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-success/10 flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold">{Math.max(...leaderboard.map(e => e.xp)).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Highest XP</div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-warning/10 flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold">{Math.floor(leaderboard.reduce((sum, e) => sum + e.xp, 0) / leaderboard.length).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Average XP</div>
            </Card>
            
            <Card className="p-4 bg-gradient-card border-border/50 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold">{Math.max(...leaderboard.map(e => e.streak))}</div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}