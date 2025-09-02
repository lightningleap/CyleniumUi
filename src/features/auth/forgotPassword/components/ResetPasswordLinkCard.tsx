import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResetPasswordSuccessCard } from "./ResetPasswordSuccessCard"
import { useNavigate } from "@tanstack/react-router"

export function ResetPasswordLinkCard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSendLink = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.")
      return
    }
    // TODO: API call to send reset link
    console.log("Password reset link sent to:", email)
    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return <ResetPasswordSuccessCard />
  }

  return (
    <Card className="flex flex-col justify-center items-center py-12 w-[360px] md:w-[472px] h-[356px] md:h-[336px] bg-[#09090B] border-[0.5px] border-[#27272A] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg">
      
      {/* Header Section */}
      <CardHeader className="flex flex-col items-center px-4 gap-6 w-[360px] md:w-[472px] h-[260px] md:h-[240px]">
        <div className="flex flex-col items-center gap-1.5 w-[328px] h-[78px]">
          <h2 className="w-[328px] h-8 font-inter font-medium text-2xl leading-8 text-center tracking-[-0.006em] text-[#FAFAFA]">
            Reset your password
          </h2>
          <p className="w-[328px] h-10 font-inter text-sm leading-5 text-center text-[#A1A1AA]">
            Enter your email address to receive a password reset link.
          </p>
        </div>
      </CardHeader>

      {/* Input Section */}
      <CardContent className="flex flex-col justify-center items-center w-[328px] h-16 gap-2">
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-[328px] h-11 text-[#FAFAFA] bg-[#09090B] border border-[#3F3F46] rounded-md px-3 focus:ring-2 focus:ring-[#006FE8] focus:border-[#006FE8] box-border"
        />
      </CardContent>

      {/* Footer Buttons */}
      <CardFooter className="flex flex-col justify-center items-center gap-1.5 px-4 w-[328px] h-[94px]">
        <Button 
          onClick={handleSendLink}
          className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] h-11 bg-[#006FE8] hover:bg-[#0061CC] rounded-md"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50.48%), #006FE8"
          }}
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B]">
            Send Reset Link
          </span>
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate({ to: '/sign-in' })}
          className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] h-11 rounded-md opacity-50 hover:opacity-100"
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#FAFAFA]">
            Back to Log In
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
