"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GraduationCap } from "lucide-react"
import type { Education } from "@/types/resume"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg mb-2">No education added yet</h3>
          <p className="text-muted-foreground mb-4">Add your educational background to strengthen your resume.</p>
          <Button onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <>
          {data.map((education, index) => (
            <Card key={education.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-heading">Education {index + 1}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution *</Label>
                    <Input
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                      placeholder="University of California, Berkeley"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input
                      value={education.fieldOfStudy}
                      onChange={(e) => updateEducation(education.id, "fieldOfStudy", e.target.value)}
                      placeholder="Computer Science"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={education.gpa || ""}
                      onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Input
                      type="month"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={education.description || ""}
                    onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, honors, or activities..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Education
          </Button>
        </>
      )}
    </div>
  )
}
