import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Code2, 
  MessageSquare, 
  Trophy, 
  Users, 
  Zap,
  Target,
  BookOpen,
  Award
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Smart algorithms match you with projects based on your skills, goals, and learning preferences.",
    badge: "Smart"
  },
  {
    icon: Code2,
    title: "Real-World Projects",
    description: "Work on actual industry projects with modern tech stacks and professional workflows.",
    badge: "Practical"
  },
  {
    icon: MessageSquare,
    title: "AI Mentor Chat",
    description: "Get instant help, code reviews, and guidance from our AI mentor available 24/7.",
    badge: "Support"
  },
  {
    icon: Trophy,
    title: "Achievements & Badges",
    description: "Earn recognition for your accomplishments and showcase your skills to employers.",
    badge: "Recognition"
  },
  {
    icon: Users,
    title: "Collaborative Workspace",
    description: "Jira-like project management with kanban boards, task tracking, and team collaboration.",
    badge: "Teamwork"
  },
  {
    icon: Target,
    title: "Skill Development",
    description: "Structured learning paths with progressive difficulty and personalized recommendations.",
    badge: "Growth"
  },
  {
    icon: BookOpen,
    title: "Code Reviews",
    description: "Detailed AI-powered code reviews with actionable feedback and improvement suggestions.",
    badge: "Quality"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Certificates and portfolio pieces that employers actually value and recognize.",
    badge: "Credibility"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Real-time feedback on your code, progress tracking, and performance analytics.",
    badge: "Fast"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-up">
          <Badge variant="outline" className="text-primary border-primary/20">
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered matching to real-world projects, we provide all the tools 
            and support you need to build your skills and advance your career.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-brand group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}