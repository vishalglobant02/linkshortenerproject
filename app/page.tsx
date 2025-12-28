import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, BarChart3, Shield, Zap, MousePointerClick, QrCode } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Shorten Your Links,
              <span className="text-primary"> Amplify Your Reach</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform long, unwieldy URLs into short, shareable links. Track clicks, analyze performance, and take control of your links with powerful analytics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-base">
                Get Started Free
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline" className="text-base" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Powerful Features for Modern Link Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and track your shortened links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Link2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Custom Short Links</CardTitle>
              <CardDescription>
                Create memorable, branded short links with custom aliases that reflect your brand
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Track clicks, analyze traffic sources, and gain insights into your link performance
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with authentication and protected links for peace of mind
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Instant link creation and blazing-fast redirects ensure optimal user experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MousePointerClick className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Click Tracking</CardTitle>
              <CardDescription>
                Monitor every click with detailed timestamps and engagement metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <QrCode className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Easy Sharing</CardTitle>
              <CardDescription>
                Share your links anywhere with copy-to-clipboard functionality and QR codes
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="flex flex-col items-center text-center space-y-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Shorten Your Links?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join thousands of users who trust our platform for their link management needs. Start creating short links in seconds.
            </p>
            <SignUpButton mode="modal">
              <Button size="lg" className="text-base">
                Create Your Account
              </Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
