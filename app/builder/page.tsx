"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PersonalDetailsForm } from "@/components/resume-builder/personal-details-form"
import { EducationForm } from "@/components/resume-builder/education-form"
import { ExperienceForm } from "@/components/resume-builder/experience-form"
import { SkillsForm } from "@/components/resume-builder/skills-form"
import { ResumePreview } from "@/components/resume-builder/resume-preview"
import { ArrowLeft, ArrowRight, Save, Eye } from "lucide-react"
import type { ResumeData } from "@/types/resume"

const STEPS = [
  { id: "personal", title: "Personal Details", description: "Basic information and contact details" },
  { id: "education", title: "Education", description: "Academic background and qualifications" },
  { id: "experience", title: "Experience", description: "Work history and achievements" },
  { id: "skills", title: "Skills", description: "Technical and soft skills" },
]

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      linkedin: "",
      website: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
    },
  })

  const progress = ((currentStep + 1) / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving resume:", resumeData)
  }

  const renderCurrentForm = () => {
    switch (STEPS[currentStep].id) {
      case "personal":
        return (
          <PersonalDetailsForm
            data={resumeData.personal}
            onChange={(personal) => setResumeData({ ...resumeData, personal })}
          />
        )
      case "education":
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
        )
      case "experience":
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
        )
      case "skills":
        return <SkillsForm data={resumeData.skills} onChange={(skills) => setResumeData({ ...resumeData, skills })} />
      default:
        return null
    }
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Resume
              </Button>
              <Button>Download PDF</Button>
            </div>
          </div>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </a>
              </Button>
              <div>
                <h1 className="font-heading font-bold text-xl">Resume Builder</h1>
                <p className="text-sm text-muted-foreground">Create your professional resume</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                      index <= currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 transition-colors ${
                        index < currentStep ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-heading">{STEPS[currentStep].title}</CardTitle>
              <CardDescription>{STEPS[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>{renderCurrentForm()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={currentStep === STEPS.length - 1}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
