import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { PasswordResetCard } from "./PasswordResetCard"

export function ResetPasswordSuccessCard() {
  const navigate = useNavigate()
  const [showResetCard, setShowResetCard] = useState(false)

  if (showResetCard) {
    return <PasswordResetCard />
  }

  return (
    <Card className="flex flex-col justify-center items-center py-12 w-[360px] md:w-[472px] h-[356px] md:h-[336px] bg-[#09090B] border-[0.5px] border-[#27272A] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg">
      
      {/* Card Header */}
      <CardHeader className="flex flex-col items-center px-4 md:px-12 gap-6 w-[360px] md:w-[472px] h-[260px] md:h-[240px]">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-14 h-14 bg-[#008A2E] rounded-full">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>

        {/* Header Text */}
        <div className="flex flex-col items-center gap-1.5 text-center w-[328px]">
          <h2 className="font-inter font-medium text-2xl leading-8 text-[#FAFAFA]">
            Check your email
          </h2>
          <p className="font-inter text-sm leading-5 text-[#A1A1AA]">
            We have sent you a password reset link on your email
          </p>
          <p className="font-inter text-sm leading-5 text-[#A1A1AA]">
            Didn’t receive the email? Click to resend
          </p>
        </div>
      </CardHeader>

      {/* Card Footer */}
      <CardFooter className="flex flex-col items-center gap-1.5 px-4 w-[328px] h-[94px]">
        <Button 
          onClick={() => setShowResetCard(true)}
          className="flex justify-center items-center px-8 w-full h-11 rounded-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50.48%), #006FE8"
          }}
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B]">
            Reset Password
          </span>
        </Button>

        <Button 
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="flex justify-center items-center px-8 w-full h-11 rounded-md opacity-50 hover:opacity-100"
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#FAFAFA]">
            Go to Login
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
