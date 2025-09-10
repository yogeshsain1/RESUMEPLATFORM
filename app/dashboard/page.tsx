"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ResumeCard } from "@/components/dashboard/resume-card"
import { CreateResumeDialog } from "@/components/dashboard/create-resume-dialog"
import { Plus, Search, Filter, User, Settings, LogOut } from "lucide-react"

// Mock data - will be replaced with real data from API
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    lastModified: "2024-01-15",
    status: "active",
    views: 24,
    downloads: 5,
  },
  {
    id: "2",
    title: "Frontend Developer Resume",
    lastModified: "2024-01-10",
    status: "draft",
    views: 12,
    downloads: 2,
  },
  {
    id: "3",
    title: "Full Stack Developer Resume",
    lastModified: "2024-01-05",
    status: "active",
    views: 18,
    downloads: 3,
  },
]

const mockUser = {
  name: "John Doe",
  email: "hire-me@anshumat.org",
  initials: "JD",
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [resumes, setResumes] = useState(mockResumes)

  const filteredResumes = resumes.filter((resume) => resume.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateResume = (title: string) => {
    const newResume = {
      id: Date.now().toString(),
      title,
      lastModified: new Date().toISOString().split("T")[0],
      status: "draft" as const,
      views: 0,
      downloads: 0,
    }
    setResumes([newResume, ...resumes])
    setShowCreateDialog(false)
  }

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleDuplicateResume = (id: string) => {
    const resumeToDuplicate = resumes.find((resume) => resume.id === id)
    if (resumeToDuplicate) {
      const duplicatedResume = {
        ...resumeToDuplicate,
        id: Date.now().toString(),
        title: `${resumeToDuplicate.title} (Copy)`,
        lastModified: new Date().toISOString().split("T")[0],
        status: "draft" as const,
        views: 0,
        downloads: 0,
      }
      setResumes([duplicatedResume, ...resumes])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Header */}
          <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="font-heading font-bold text-2xl">Dashboard</h1>
                <p className="text-muted-foreground">Manage your resumes and track your progress</p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <AvatarInitials>{mockUser.initials}</AvatarInitials>
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{mockUser.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{mockUser.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{resumes.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{resumes.reduce((sum, resume) => sum + resume.views, 0)}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{resumes.reduce((sum, resume) => sum + resume.downloads, 0)}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Resumes Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl">Your Resumes</h2>
                <Button variant="outline" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>

              {filteredResumes.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">No resumes found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Create your first resume to get started"}
                      </p>
                    </div>
                    {!searchQuery && (
                      <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Resume
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResumes.map((resume) => (
                    <ResumeCard
                      key={resume.id}
                      resume={resume}
                      onDelete={handleDeleteResume}
                      onDuplicate={handleDuplicateResume}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <CreateResumeDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateResume={handleCreateResume}
      />
    </div>
  )
}
