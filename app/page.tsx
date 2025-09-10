import { AuthTabs } from "@/components/auth-tabs"
import { FeatureShowcase } from "@/components/improvements/feature-showcase"
import { TestimonialsSection } from "@/components/improvements/testimonials-section"
import { PricingSection } from "@/components/improvements/pricing-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Header */}
      <header className="relative border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-heading font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">ResumeBuilder Pro</h1>
                <p className="text-xs text-muted-foreground">Professional Resume Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium"
              >
                About
              </a>
              <Badge variant="secondary" className="text-xs font-medium">
                Beta
              </Badge>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit text-xs font-medium px-3 py-1">
                ✨ Trusted by 10,000+ professionals
              </Badge>
              <h2 className="font-heading font-bold text-5xl lg:text-6xl text-balance leading-[1.1] tracking-tight">
                Build Professional Resumes That Get You
                <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"> Hired</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed max-w-lg">
                Create, customize, and manage multiple resume versions with our intuitive builder. Stand out from the
                competition with professional templates and expert guidance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-sm">Multiple Versions</span>
                  <p className="text-xs text-muted-foreground">Create targeted resumes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-sm">PDF Export</span>
                  <p className="text-xs text-muted-foreground">Download instantly</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-sm">Pro Templates</span>
                  <p className="text-xs text-muted-foreground">Designer-crafted</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-sm">Secure & Private</span>
                  <p className="text-xs text-muted-foreground">Your data protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-3 pb-6">
                <CardTitle className="font-heading text-2xl">Get Started Today</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Join thousands of professionals who trust ResumeBuilder Pro
                </CardDescription>
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1">
                    <div className="flex -space-x-1">
                      <div className="h-6 w-6 rounded-full bg-primary/20 border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-secondary/20 border-2 border-background"></div>
                      <div className="h-6 w-6 rounded-full bg-primary/30 border-2 border-background"></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">10k+ users</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AuthTabs />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Feature Showcase Section */}
      <FeatureShowcase />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">R</span>
                </div>
                <span className="font-heading font-bold">ResumeBuilder Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional resume platform trusted by thousands of job seekers worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">
                  Resume Builder
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Templates
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  PDF Export
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Analytics
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">
                  Help Center
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  API Docs
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Status
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">
                  About
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Blog
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Careers
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 ResumeBuilder Pro. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>💼
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>🐙
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
