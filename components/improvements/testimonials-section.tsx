"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "/professional-woman-diverse.png",
      content:
        "ResumeBuilder Pro helped me land my dream job at Google. The templates are clean and the PDF export is flawless.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Microsoft",
      avatar: "/professional-man.png",
      content:
        "I've tried many resume builders, but this one stands out. The multiple versions feature is a game-changer.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Airbnb",
      avatar: "/professional-woman-designer.png",
      content:
        "The design templates are beautiful and professional. Got 3x more interview calls after switching to this platform.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Data Scientist at Netflix",
      avatar: "/professional-data-scientist.png",
      content: "Clean interface, powerful features, and excellent PDF quality. Highly recommend for any job seeker.",
      rating: 5,
    },
  ]

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Professionals Worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful job seekers who've landed their dream jobs using our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
