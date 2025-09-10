import { SignIn as ClerkSignIn } from "@clerk/clerk-react"
import { Code } from "lucide-react"

const SignIn = () => {
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
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">
            Sign in to continue your learning journey
          </p>
        </div>
        
        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <ClerkSignIn 
            fallbackRedirectUrl="/dashboard"
            forceRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn