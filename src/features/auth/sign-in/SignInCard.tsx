import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SignInCard() {
  return (
    <Card className="w-full max-h-[430px] px-10 py-5 rounded-2xl bg-black border border-white/10 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-sm text-center text-[#006FE8] font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-center text-[#FAFAFA] text-xl font-medium">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-[#FAFAFA]">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2 text-[#FAFAFA]">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="/forgotPassword" className="text-sm text-[#FAFAFA] hover:underline underline-offset-2">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button variant="gradient" size="lg" type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
