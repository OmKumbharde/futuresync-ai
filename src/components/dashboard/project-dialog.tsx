import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Clock, 
  Users, 
  Star,
  ExternalLink,
  CheckCircle,
  Circle,
  Filter,
  X
} from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  progress?: number
  tasksCompleted?: number
  totalTasks?: number
  estimatedWeeks?: number
  students?: number
  rating?: number
  longDescription?: string
  requirements?: string[]
  learningOutcomes?: string[]
  isEnrolled?: boolean
}

interface ProjectDialogProps {
  project: Project
  onEnroll?: (projectId: number) => void
  onContinue?: (projectId: number) => void
}

export function ProjectDialog({ project, onEnroll, onContinue }: ProjectDialogProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  
  const handleEnroll = async () => {
    setIsEnrolling(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onEnroll?.(project.id)
    setIsEnrolling(false)
  }

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
              {project.difficulty}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {project.estimatedWeeks && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.estimatedWeeks} weeks
                </div>
              )}
              {project.students && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.students} students
                </div>
              )}
              {project.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-warning" />
                  {project.rating}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {project.longDescription || project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {project.isEnrolled && project.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Your Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {project.tasksCompleted} of {project.totalTasks} tasks completed
            </p>
          </div>
        )}

        {/* Requirements */}
        {project.requirements && (
          <div className="space-y-2">
            <h4 className="font-semibold">Prerequisites</h4>
            <ul className="space-y-1">
              {project.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Outcomes */}
        {project.learningOutcomes && (
          <div className="space-y-2">
            <h4 className="font-semibold">What You'll Learn</h4>
            <ul className="space-y-1">
              {project.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Circle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          {project.isEnrolled ? (
            <HeroButton 
              variant="hero" 
              className="flex-1"
              onClick={() => onContinue?.(project.id)}
            >
              <Play className="w-4 h-4" />
              Continue Working
            </HeroButton>
          ) : (
            <HeroButton 
              variant="hero" 
              className="flex-1"
              onClick={handleEnroll}
              disabled={isEnrolling}
            >
              {isEnrolling ? "Enrolling..." : "Join Project"}
            </HeroButton>
          )}
          <HeroButton variant="hero-outline">
            <ExternalLink className="w-4 h-4" />
            Preview
          </HeroButton>
        </div>
      </div>
    </DialogContent>
  )
}