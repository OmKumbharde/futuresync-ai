import { HeroButton } from "@/components/ui/hero-button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Ready to Start Learning?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Join Thousands of Students{" "}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Building Their Future
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Start your journey today with AI-powered learning, real projects, 
              and industry recognition. Your next career opportunity is just one click away.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HeroButton variant="hero" size="xl" className="animate-glow-pulse" asChild>
              <Link to="/sign-up">
                Start Learning Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </HeroButton>
            <HeroButton variant="hero-outline" size="xl">
              View Success Stories
            </HeroButton>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by students from</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-lg font-semibold">MIT</div>
              <div className="text-lg font-semibold">Stanford</div>
              <div className="text-lg font-semibold">UC Berkeley</div>
              <div className="text-lg font-semibold">Georgia Tech</div>
              <div className="text-lg font-semibold">CMU</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}