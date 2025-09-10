import { HeroButton } from "@/components/ui/hero-button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from "@/assets/hero-workspace.jpg"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-bounce-gentle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-bounce-gentle animation-delay-1000" />
      
      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Learning Platform
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Master Skills with{" "}
                  <span className="bg-gradient-brand bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                    AI-Powered
                  </span>{" "}
                  Micro-Internships
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                  Real-world projects, AI mentorship, and industry recognition. 
                  Build your portfolio while earning achievements and climbing leaderboards.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <HeroButton variant="hero" size="xl" className="animate-glow-pulse" asChild>
                  <Link to="/sign-up">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </HeroButton>
                <HeroButton variant="hero-outline" size="xl" asChild>
                  <Link to="/dashboard">
                    <Zap className="w-5 h-5" />
                    View Projects
                  </Link>
                </HeroButton>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Hero Image */}
            <div className="relative animate-fade-up animation-delay-300">
              <div className="relative rounded-3xl overflow-hidden shadow-glow">
                <img 
                  src={heroImage} 
                  alt="AI-powered workspace with multiple screens showing code and collaboration tools"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-brand animate-bounce-gentle">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium">AI Mentor Online</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-brand animate-bounce-gentle animation-delay-500">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">+50 XP Earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}