"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Edit, Copy, Download, Eye, Trash2, Calendar, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

interface Resume {
  id: string
  title: string
  lastModified: string
  status: "active" | "draft"
  views: number
  downloads: number
}

interface ResumeCardProps {
  resume: Resume
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function ResumeCard({ resume, onDelete, onDuplicate }: ResumeCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDelete = () => {
    onDelete(resume.id)
    setShowDeleteDialog(false)
  }

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true)
      const pdfBlob = await apiClient.downloadResumePDF(resume.id)

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resume.title}_Resume.pdf`
      document.body.appendChild(link)
      link.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      toast({
        title: "Success",
        description: "Resume PDF downloaded successfully",
      })
    } catch (error) {
      console.error("Download failed:", error)
      toast({
        title: "Error",
        description: "Failed to download resume PDF",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-heading line-clamp-1">{resume.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Modified {formatDate(resume.lastModified)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={resume.status === "active" ? "default" : "secondary"}>{resume.status}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a href={`/builder?id=${resume.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`/preview?id=${resume.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(resume.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadPDF} disabled={isDownloading}>
                    {isDownloading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Resume Preview Placeholder */}
          <div className="aspect-[3/4] bg-muted rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center mx-auto">
                <Eye className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Resume Preview</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Eye className="h-3 w-3" />
                {resume.views}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Download className="h-3 w-3" />
                {resume.downloads}
              </div>
            </div>
            <Button size="sm" asChild>
              <a href={`/builder?id=${resume.id}`}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{resume.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
