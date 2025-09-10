import { SignUp as ClerkSignUp } from "@clerk/clerk-react"
import { Code, AlertCircle } from "lucide-react"
import { CLERK_PUBLISHABLE_KEY } from "@/lib/clerk"
import { HeroButton } from "@/components/ui/hero-button"
import { Link } from "react-router-dom"

const SignUp = () => {
  // Show setup message if no Clerk key
  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Code className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              SkillSync
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-2xl font-bold">Authentication Setup Required</h2>
            <p className="text-muted-foreground">
              To enable sign-up functionality, you'll need to set up Clerk authentication with your publishable key.
            </p>
            <div className="space-y-2">
              <HeroButton variant="hero" size="lg" asChild>
                <Link to="/dashboard">
                  View Demo Dashboard
                </Link>
              </HeroButton>
              <HeroButton variant="hero-outline" size="lg" asChild>
                <Link to="/landing">
                  Back to Landing
                </Link>
              </HeroButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <Code className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              SkillSync
            </span>
          </div>
          <h2 className="text-3xl font-bold">Start Your Journey</h2>
          <p className="text-muted-foreground mt-2">
            Join thousands of students building their future
          </p>
        </div>
        
        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <ClerkSignUp 
            fallbackRedirectUrl="/onboarding"
            forceRedirectUrl="/onboarding"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp