import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast-provider"

interface PasswordResetCardProps {
  onBack?: () => void
}

export function PasswordResetCard({ onBack }: PasswordResetCardProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { addToast } = useToast()

  const handleReset = () => {
    if (!password || !confirmPassword) {
      addToast({
        title: "Validation Error",
        description: "Please fill in both fields.",
        duration: 3000,
      })
      return
    }
    if (password !== confirmPassword) {
      addToast({
        title: "Validation Error",
        description: "Passwords do not match.",
        duration: 3000,
      })
      return
    }
    // TODO: Add API call
    console.log("Password successfully reset:", password)
    addToast({
      title: "Success",
      description: "Your password has been reset successfully.",
      duration: 3000,
    })
  }

  return (
    <Card className="flex flex-col justify-center items-center py-12 w-[360px] md:w-[472px] h-[356px] md:h-[394px] bg-[#09090B] border-[0.5px] border-[#27272A] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg">
      {/* Header */}
      <div className="flex flex-col items-start px-4 md:px-12 gap-6 w-[360px] md:w-[472px] h-[298px]">
        <div className="flex flex-col items-center gap-1.5 w-[328px] md:w-[376px] h-[58px]">
          <h2 className="font-inter font-medium text-2xl leading-8 tracking-[-0.006em] text-[#FAFAFA] w-[328px] md:w-[376px] text-center">
            Set New Password
          </h2>
          <p className="font-inter text-sm leading-5 text-[#A1A1AA] w-[328px] md:w-[365px] text-center">
            Choose a strong new password to secure your account
          </p>
        </div>

      {/* Password Field */}
        <div className="flex flex-col gap-1.5 w-[328px] md:w-[376px] h-[62px]">
        <div className="flex flex-row items-center w-[65px] h-5">
          <span className="font-inter text-sm font-medium leading-5 tracking-[-0.006em] text-[#FAFAFA]">
            Password
          </span>
        </div>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-[328px] md:w-[376px] h-[36px] text-[#A1A1AA] bg-[#09090B] border border-[#3F3F46] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#006FE8] focus:border-[#006FE8]"
        />
      </div>

      {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5 w-[328px] md:w-[376px] h-[62px]">
        <div className="flex flex-row items-center w-[122px] h-5">
          <span className="font-inter text-sm font-medium leading-5 tracking-[-0.006em] text-[#FAFAFA]">
            Confirm Password
          </span>
        </div>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter new password"
          className="w-[328px] md:w-[376px] h-[36px] text-[#A1A1AA] bg-[#09090B] border border-[#3F3F46] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#006FE8] focus:border-[#006FE8]"
        />
      </div>

      {/* Footer */}
        <div className="flex flex-col justify-center items-center gap-1.5 px-4 w-[328px] md:w-[376px] h-[94px]">
          <Button
            onClick={handleReset}
            className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] md:w-[376px] h-11 bg-[#006FE8] hover:bg-[#0061CC] rounded-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50.48%), #006FE8",
            }}
          >
            <span className="font-inter text-sm font-medium leading-5 tracking-[-0.006em] text-[#09090B]">
              Reset Password
            </span>
          </Button>
          {onBack && (
            <button
              onClick={onBack}
              className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] md:w-[376px] h-11 rounded-md opacity-50 hover:opacity-100"
            >
              <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#FAFAFA]">
                Go Back
              </span>
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
