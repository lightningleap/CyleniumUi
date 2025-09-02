import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-12">
        <div className="max-w-md">
          <img 
            src="/placeholder.svg" 
            alt="Login Illustration" 
            className="w-full h-auto object-cover"
          />
          <p className="mt-6 text-center text-gray-600">
            Welcome to our platform. Please sign in to continue.
          </p>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
            <CardDescription>
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}