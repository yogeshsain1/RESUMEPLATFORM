"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Code, Users } from "lucide-react"
import type { Skills } from "@/types/resume"

interface SkillsFormProps {
  data: Skills
  onChange: (data: Skills) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()],
      })
      setNewTechnicalSkill("")
    }
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()],
      })
      setNewSoftSkill("")
    }
  }

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index),
    })
  }

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent, type: "technical" | "soft") => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "technical") {
        addTechnicalSkill()
      } else {
        addSoftSkill()
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Code className="h-5 w-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "technical")}
              placeholder="e.g., JavaScript, Python, React, AWS..."
            />
            <Button onClick={addTechnicalSkill} disabled={!newTechnicalSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data.technical.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.technical.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeTechnicalSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Add technical skills like programming languages, frameworks, tools, and technologies.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Users className="h-5 w-5" />
            Soft Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, "soft")}
              placeholder="e.g., Leadership, Communication, Problem Solving..."
            />
            <Button onClick={addSoftSkill} disabled={!newSoftSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data.soft.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.soft.map((skill, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeSoftSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Add soft skills like communication, leadership, teamwork, and problem-solving abilities.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Suggested Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base">Suggested Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Popular Technical Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS", "Docker"].map((skill) => (
                  <Button
                    key={skill}
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1 px-2 text-xs"
                    onClick={() => {
                      if (!data.technical.includes(skill)) {
                        onChange({
                          ...data,
                          technical: [...data.technical, skill],
                        })
                      }
                    }}
                    disabled={data.technical.includes(skill)}
                  >
                    + {skill}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Popular Soft Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management", "Adaptability"].map(
                  (skill) => (
                    <Button
                      key={skill}
                      variant="ghost"
                      size="sm"
                      className="h-auto py-1 px-2 text-xs"
                      onClick={() => {
                        if (!data.soft.includes(skill)) {
                          onChange({
                            ...data,
                            soft: [...data.soft, skill],
                          })
                        }
                      }}
                      disabled={data.soft.includes(skill)}
                    >
                      + {skill}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
