import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SignLeftImage from "@/assets/SignInImages/cyleniumSignLeftBg.jpg"
import CyleniumLogo from "@/assets/SignInImages/CyleniumLogo.svg"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[640px_1fr] h-screen">

        {/* Left Side - Background Image - Hidden on medium and small screens */}
        <div 
          className="hidden lg:block relative bg-cover bg-center h-full w-full"
          style={{ backgroundImage: `url(${SignLeftImage})` }}
        >
          {/* Top-left logo */}
          <div className="absolute top-6 left-6">
            <img src={CyleniumLogo} alt="Logo" className="h-[58px] w-[95px]" />
          </div>

          {/* Bottom-center text */}
          <div className="absolute bottom-6 w-full text-left space-y-3 px-4">
            <p className="text-gray-100 text-sm drop-shadow-md">
              "Cylenium Cloud helped us secure our remote endpoints with confidence, all while maintaining seamless access across our hybrid infrastructure."
            </p>
            <h4 className="text-gray-100 text-sm font-medium drop-shadow-md">Infrastructure Lead, Energy</h4>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="flex flex-col w-full items-center bg-black justify-center p-4 overflow-y-auto relative">
          {/* Logo for medium and small screens */}
          <div className="absolute top-40 left-36 lg:hidden">
            <img src={CyleniumLogo} alt="Logo" className="h-[58px] w-[95px]" />
          </div>
          
          <div className="w-full max-w-[472px] mt-16 lg:mt-0">
            <Card className="w-full max-h-[430px] px-10 py-5 rounded-2xl bg-[#09090B]">
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
                    <a href="#" className="text-sm  text-[#FAFAFA] hover:underline underline-offset-2">
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
          </div>
        </div>
      </div>
    </div>
  )
}