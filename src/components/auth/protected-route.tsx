import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"
import { CLERK_PUBLISHABLE_KEY } from "@/lib/clerk"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // If no Clerk key, allow access for demo purposes
  if (!CLERK_PUBLISHABLE_KEY) {
    return <>{children}</>
  }

  const { isLoaded, isSignedIn } = useAuth()
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }
  
  return <>{children}</>
}