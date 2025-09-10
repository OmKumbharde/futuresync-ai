import { HeroButton } from "@/components/ui/hero-button"
import { Code, LogIn, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass backdrop-blur-md border-b border-glass">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Code className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            SkillSync
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <HeroButton variant="hero-ghost" size="default" asChild>
            <Link to="/sign-in">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          </HeroButton>
          <HeroButton variant="hero" size="default" asChild>
            <Link to="/sign-up">
              <UserPlus className="w-4 h-4" />
              Get Started
            </Link>
          </HeroButton>
        </div>
      </nav>
    </header>
  )
}