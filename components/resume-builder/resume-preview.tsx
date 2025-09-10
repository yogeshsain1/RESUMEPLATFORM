"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-heading font-bold text-3xl">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {data.personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {data.personal.phone}
              </div>
            )}
            {(data.personal.city || data.personal.state) && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {[data.personal.city, data.personal.state].filter(Boolean).join(", ")}
              </div>
            )}
            {data.personal.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                {data.personal.linkedin}
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {data.personal.website}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personal.summary && (
          <>
            <Separator />
            <div>
              <h2 className="font-heading font-semibold text-xl mb-3">Professional Summary</h2>
              <p className="text-sm leading-relaxed">{data.personal.summary}</p>
            </div>
          </>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="font-heading font-semibold text-xl mb-4">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-sm leading-relaxed whitespace-pre-line pl-4">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="font-heading font-semibold text-xl mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {edu.degree} in {edu.fieldOfStudy}
                        </h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                    {edu.description && <div className="text-sm leading-relaxed pl-4">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <>
            <Separator />
            <div>
              <h2 className="font-heading font-semibold text-xl mb-4">Skills</h2>
              <div className="space-y-3">
                {data.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.technical.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.soft.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
