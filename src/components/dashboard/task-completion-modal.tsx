import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Star, Trophy, TrendingUp, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TaskCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  taskTitle: string
  xpAwarded: number
  achievementsUnlocked?: Achievement[]
  onConfirm: () => void
}

interface Achievement {
  id: number
  name: string
  description: string
  xp: number
  rarity: string
}

export function TaskCompletionModal({ 
  isOpen, 
  onClose, 
  projectTitle, 
  taskTitle, 
  xpAwarded,
  achievementsUnlocked = [],
  onConfirm 
}: TaskCompletionModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { toast } = useToast()

  const handleConfirm = () => {
    onConfirm()
    onClose()
    toast({
      title: "Task Completed! 🎉",
      description: `You earned ${xpAwarded} XP and unlocked ${achievementsUnlocked.length} achievements!`,
    })
  }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-success" />
            Task Completed!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Info */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{taskTitle}</h3>
            <p className="text-sm text-muted-foreground">in {projectTitle}</p>
          </div>

          {/* XP Reward */}
          <Card className="p-4 bg-gradient-primary text-primary-foreground text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                <span className="text-2xl font-bold">+{xpAwarded} XP</span>
              </div>
              <p className="text-sm opacity-90">Experience Points Earned</p>
            </div>
          </Card>

          {/* Achievements */}
          {achievementsUnlocked.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-warning" />
                New Achievements Unlocked!
              </h4>
              <div className="space-y-2">
                {achievementsUnlocked.map((achievement) => (
                  <Card key={achievement.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{achievement.name}</span>
                          <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">+{achievement.xp} XP</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Level Progress</span>
              <span>85% to Level 5</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <HeroButton 
              variant="hero" 
              className="flex-1"
              onClick={handleConfirm}
            >
              <TrendingUp className="w-4 h-4" />
              Continue Learning
            </HeroButton>
            <HeroButton 
              variant="hero-outline" 
              onClick={onClose}
            >
              <X className="w-4 h-4" />
              Close
            </HeroButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}