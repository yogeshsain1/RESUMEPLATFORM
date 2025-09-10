"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleIcons } from "@/components/ui/simple-icons"

export function FeatureShowcase() {
  const features = [
    {
      icon: <SimpleIcons.Zap />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for improving your resume content and structure.",
      status: "Coming Soon",
    },
    {
      icon: <SimpleIcons.Globe />,
      title: "Public Resume Links",
      description: "Share your resume with a beautiful, professional public URL.",
      status: "Available",
    },
    {
      icon: <SimpleIcons.Palette />,
      title: "Custom Templates",
      description: "Choose from multiple professionally designed resume templates.",
      status: "Available",
    },
    {
      icon: <SimpleIcons.BarChart />,
      title: "Analytics Dashboard",
      description: "Track views, downloads, and engagement on your shared resumes.",
      status: "Coming Soon",
    },
    {
      icon: <SimpleIcons.Shield />,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our scanner.",
      status: "Beta",
    },
    {
      icon: <SimpleIcons.Users />,
      title: "Team Collaboration",
      description: "Get feedback from mentors and peers on your resume drafts.",
      status: "Coming Soon",
    },
  ]

  return (
    <div className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Job Seekers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform goes beyond basic resume building with advanced features designed to help you stand out in
            today's competitive job market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">{feature.icon}</div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      feature.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : feature.status === "Beta"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
