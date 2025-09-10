"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, GraduationCap, Code } from "lucide-react"

interface CreateResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateResume: (title: string) => void
}

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and modern design perfect for corporate roles",
    icon: Briefcase,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design for creative professionals",
    icon: FileText,
  },
  {
    id: "academic",
    name: "Academic",
    description: "Traditional format ideal for academic positions",
    icon: GraduationCap,
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for developers and technical roles",
    icon: Code,
  },
]

export function CreateResumeDialog({ open, onOpenChange, onCreateResume }: CreateResumeDialogProps) {
  const [resumeTitle, setResumeTitle] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("professional")

  const handleCreate = () => {
    if (resumeTitle.trim()) {
      onCreateResume(resumeTitle.trim())
      setResumeTitle("")
      setSelectedTemplate("professional")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreate()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading">Create New Resume</DialogTitle>
          <DialogDescription>Choose a template and give your resume a name to get started.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resume Title */}
          <div className="space-y-2">
            <Label htmlFor="resumeTitle">Resume Title</Label>
            <Input
              id="resumeTitle"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Software Engineer Resume, Marketing Manager CV"
              autoFocus
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label>Choose Template</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTemplate === template.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <template.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-sm font-heading">{template.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">{template.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!resumeTitle.trim()}>
            Create Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
