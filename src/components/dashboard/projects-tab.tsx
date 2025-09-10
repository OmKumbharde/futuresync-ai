import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroButton } from "@/components/ui/hero-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectDialog } from "./project-dialog"
import { 
  Search, 
  Filter, 
  Plus,
  X,
  SlidersHorizontal
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

interface ProjectsTabProps {
  myProjects: Project[]
  availableProjects: Project[]
  onEnrollProject: (projectId: number) => void
  onContinueProject: (projectId: number) => void
}

export function ProjectsTab({ myProjects, availableProjects, onEnrollProject, onContinueProject }: ProjectsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [tagFilter, setTagFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Get all unique tags
  const allTags = Array.from(new Set(availableProjects.flatMap(p => p.tags)))

  // Filter available projects
  const filteredProjects = availableProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || project.difficulty === difficultyFilter
    const matchesTag = tagFilter === "all" || project.tags.includes(tagFilter)
    
    return matchesSearch && matchesDifficulty && matchesTag
  })

  const clearFilters = () => {
    setSearchTerm("")
    setDifficultyFilter("all")
    setTagFilter("all")
  }

  const hasActiveFilters = searchTerm || difficultyFilter !== "all" || tagFilter !== "all"

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">My Projects</h2>
            <Dialog>
              <DialogTrigger asChild>
                <HeroButton variant="hero-outline" size="default">
                  <Plus className="w-4 h-4" />
                  Browse Projects
                </HeroButton>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Browse Available Projects</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-4 pr-4">
                    {availableProjects.map((project) => (
                      <Card key={project.id} className="p-4 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold">{project.title}</h3>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"} className="text-xs">
                              {project.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <HeroButton variant="hero" size="default" className="w-full">
                                View Details
                              </HeroButton>
                            </DialogTrigger>
                            <ProjectDialog 
                              project={{
                                ...project,
                                students: Math.floor(Math.random() * 100) + 20,
                                rating: 4.2 + Math.random() * 0.7,
                                longDescription: `${project.description} This comprehensive project will take you through industry-standard practices and real-world scenarios that you'll encounter in professional development environments.`,
                                requirements: ["Basic programming knowledge", "Understanding of web development concepts", "Familiarity with version control"],
                                learningOutcomes: ["Build production-ready applications", "Learn industry best practices", "Gain hands-on experience", "Portfolio-worthy project completion"]
                              }}
                              onEnroll={onEnrollProject}
                            />
                          </Dialog>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {myProjects.length === 0 ? (
              <Card className="p-8 text-center bg-gradient-card border-border/50">
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No Projects Yet</h3>
                  <p className="text-muted-foreground">
                    Join your first project to start building your portfolio and earning achievements.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <HeroButton variant="hero">
                        Browse Available Projects
                      </HeroButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      {/* Reuse the same browse dialog content */}
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ) : (
              myProjects.map((project) => (
                <Card key={project.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-brand group">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                      <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {project.tasksCompleted}/{project.totalTasks} tasks</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <HeroButton 
                        variant="hero" 
                        className="flex-1"
                        onClick={() => onContinueProject(project.id)}
                      >
                        Continue Working
                      </HeroButton>
                      <Dialog>
                        <DialogTrigger asChild>
                          <HeroButton variant="hero-outline">
                            Details
                          </HeroButton>
                        </DialogTrigger>
                        <ProjectDialog 
                          project={{
                            ...project,
                            students: Math.floor(Math.random() * 100) + 20,
                            rating: 4.2 + Math.random() * 0.7,
                            longDescription: `${project.description} This comprehensive project will take you through industry-standard practices and real-world scenarios.`,
                            requirements: ["Basic programming knowledge", "Understanding of web development concepts"],
                            learningOutcomes: ["Build production-ready applications", "Learn industry best practices", "Portfolio-worthy completion"]
                          }}
                          onContinue={onContinueProject}
                        />
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Available Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Projects</h2>
            <div className="flex items-center gap-2">
              <HeroButton 
                variant="hero-ghost" 
                size="default"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </HeroButton>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {showFilters && (
              <div className="space-y-3 p-4 bg-card/50 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Difficulty</label>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Technology</label>
                    <Select value={tagFilter} onValueChange={setTagFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Technologies</SelectItem>
                        {allTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    <HeroButton variant="hero-ghost" size="default" onClick={clearFilters}>
                      <X className="w-3 h-3" />
                      Clear All
                    </HeroButton>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <Card className="p-6 text-center bg-gradient-card border-border/50">
                <p className="text-muted-foreground">No projects match your current filters.</p>
                <HeroButton variant="hero-ghost" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </HeroButton>
              </Card>
            ) : (
              filteredProjects.map((project) => (
                <Card key={project.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-brand group">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                      <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Estimated: {project.estimatedWeeks} weeks
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <HeroButton variant="hero-outline" className="flex-1">
                            View Details
                          </HeroButton>
                        </DialogTrigger>
                        <ProjectDialog 
                          project={{
                            ...project,
                            students: Math.floor(Math.random() * 100) + 20,
                            rating: 4.2 + Math.random() * 0.7,
                            longDescription: `${project.description} This comprehensive project will take you through industry-standard practices and real-world scenarios that you'll encounter in professional development environments.`,
                            requirements: ["Basic programming knowledge", "Understanding of web development concepts", "Familiarity with version control"],
                            learningOutcomes: ["Build production-ready applications", "Learn industry best practices", "Gain hands-on experience", "Portfolio-worthy project completion"]
                          }}
                          onEnroll={onEnrollProject}
                        />
                      </Dialog>
                      <HeroButton 
                        variant="hero" 
                        onClick={() => onEnrollProject(project.id)}
                      >
                        Join Project
                      </HeroButton>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}