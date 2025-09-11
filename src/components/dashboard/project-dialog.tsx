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

// Enhanced project data with full details
const getEnhancedProjectData = (project: Project): Project => {
  const enhancedData: Record<number, Partial<Project>> = {
    1: {
      longDescription: "Build a comprehensive REST API for an e-commerce platform with secure authentication, payment processing, inventory management, and order tracking. You'll work with Node.js, Express, and MongoDB to create a scalable backend system.",
      requirements: ["Basic JavaScript knowledge", "Understanding of REST APIs", "Node.js fundamentals"],
      learningOutcomes: ["Master Express.js framework", "Implement JWT authentication", "Integrate payment gateways", "Design MongoDB schemas", "Write comprehensive API tests"],
      students: 156,
      rating: 4.8
    },
    2: {
      longDescription: "Create a modern, responsive dashboard component using React and TypeScript. The dashboard will feature interactive charts, real-time data updates, and a clean, professional design suitable for business applications.",
      requirements: ["React basics", "TypeScript knowledge", "CSS fundamentals"],
      learningOutcomes: ["Master React hooks", "Implement Chart.js visualizations", "TypeScript best practices", "Responsive design patterns", "Component composition"],
      students: 89,
      rating: 4.6
    },
    3: {
      longDescription: "Dive deep into data analysis using Python's powerful pandas library and matplotlib for visualization. You'll work with real sales datasets to extract meaningful insights and create professional reports.",
      requirements: ["Python basics", "Mathematics fundamentals", "Statistics knowledge"],
      learningOutcomes: ["Master pandas DataFrames", "Advanced data manipulation", "Statistical analysis", "Data visualization", "Report generation"],
      students: 67,
      rating: 4.9
    },
    4: {
      longDescription: "Build a cross-platform mobile application using React Native. Create a task management app with offline capabilities, push notifications, and seamless synchronization across devices.",
      requirements: ["React knowledge", "Mobile development basics", "JavaScript proficiency"],
      learningOutcomes: ["React Native components", "Navigation patterns", "State management", "Device API integration", "App store deployment"],
      students: 134,
      rating: 4.7
    },
    5: {
      longDescription: "Deploy machine learning models as production-ready web applications using Flask. Learn the complete ML pipeline from data preprocessing to model deployment and monitoring.",
      requirements: ["Python programming", "Machine learning basics", "Web development fundamentals"],
      learningOutcomes: ["ML model deployment", "Flask web framework", "API design for ML", "Model monitoring", "Cloud deployment"],
      students: 45,
      rating: 4.9
    },
    6: {
      longDescription: "Design and develop a stunning portfolio website using Vue.js with smooth animations, responsive design, and modern web development practices. Perfect for showcasing your work.",
      requirements: ["HTML/CSS basics", "JavaScript fundamentals", "Design principles"],
      learningOutcomes: ["Vue.js framework", "CSS animations", "Responsive design", "Performance optimization", "SEO best practices"],
      students: 198,
      rating: 4.5
    },
    7: {
      longDescription: "Build a modern GraphQL API with real-time subscriptions using Node.js. Learn advanced backend development patterns and create efficient, type-safe APIs.",
      requirements: ["Node.js experience", "API development", "Database knowledge"],
      learningOutcomes: ["GraphQL schema design", "Resolver patterns", "Real-time subscriptions", "Type safety", "Performance optimization"],
      students: 78,
      rating: 4.8
    },
    8: {
      longDescription: "Master DevOps practices by setting up complete CI/CD pipelines using Docker, Jenkins, and AWS. Learn infrastructure as code and automated deployment strategies.",
      requirements: ["Linux basics", "Git knowledge", "Command line proficiency"],
      learningOutcomes: ["Docker containerization", "CI/CD pipelines", "AWS deployment", "Infrastructure automation", "Monitoring and logging"],
      students: 112,
      rating: 4.7
    }
  }

  return {
    ...project,
    ...enhancedData[project.id]
  }
}

interface ProjectDialogProps {
  project: Project
  onEnroll?: (projectId: number) => void
  onContinue?: (projectId: number) => void
}

export function ProjectDialog({ project, onEnroll, onContinue }: ProjectDialogProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  
  // Get enhanced project data with full details
  const enhancedProject = getEnhancedProjectData(project)
  
  const handleEnroll = async () => {
    setIsEnrolling(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onEnroll?.(project.id)
    setIsEnrolling(false)
  }

  const handlePreview = () => {
    window.open(`https://github.com/skillsync-demo/${project.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank')
  }

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">{enhancedProject.title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={enhancedProject.difficulty === "Beginner" ? "secondary" : enhancedProject.difficulty === "Intermediate" ? "default" : "destructive"}>
              {enhancedProject.difficulty}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {enhancedProject.estimatedWeeks && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {enhancedProject.estimatedWeeks} weeks
                </div>
              )}
              {enhancedProject.students && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {enhancedProject.students} students
                </div>
              )}
              {enhancedProject.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-warning" />
                  {enhancedProject.rating}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {enhancedProject.longDescription || enhancedProject.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {enhancedProject.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {enhancedProject.isEnrolled && enhancedProject.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Your Progress</span>
              <span>{enhancedProject.progress}%</span>
            </div>
            <Progress value={enhancedProject.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {enhancedProject.tasksCompleted} of {enhancedProject.totalTasks} tasks completed
            </p>
          </div>
        )}

        {/* Requirements */}
        {enhancedProject.requirements && (
          <div className="space-y-2">
            <h4 className="font-semibold">Prerequisites</h4>
            <ul className="space-y-1">
              {enhancedProject.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Outcomes */}
        {enhancedProject.learningOutcomes && (
          <div className="space-y-2">
            <h4 className="font-semibold">What You'll Learn</h4>
            <ul className="space-y-1">
              {enhancedProject.learningOutcomes.map((outcome, index) => (
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
          {enhancedProject.isEnrolled ? (
            <HeroButton 
              variant="hero" 
              className="flex-1"
              onClick={() => onContinue?.(enhancedProject.id)}
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
          <HeroButton 
            variant="hero-outline"
            onClick={handlePreview}
          >
            <ExternalLink className="w-4 h-4" />
            Preview
          </HeroButton>
        </div>
      </div>
    </DialogContent>
  )
}