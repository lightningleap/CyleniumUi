import { useState, useRef } from "react"
import type { KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export function MfaCard() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '') // Allow only digits
    if (!numericValue) return

    const updatedOtp = [...otp]
    updatedOtp[index] = numericValue
    setOtp(updatedOtp)

    // Move to next input if available
    if (index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const updatedOtp = [...otp]
      if (otp[index]) {
        // If current field has a value, clear it
        updatedOtp[index] = ''
      } else if (index > 0) {
        // If current field is empty, move to previous field and clear it
        updatedOtp[index - 1] = ''
        inputRefs.current[index - 1]?.focus()
      }
      setOtp(updatedOtp)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    const updatedOtp = pasted.split('')
    while (updatedOtp.length < 6) updatedOtp.push('') // Fill empty slots
    setOtp(updatedOtp)

    // Focus the next empty input
    const nextIndex = pasted.length < 6 ? pasted.length : 5
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <Card className="flex flex-col justify-center items-center py-12 w-[360px] md:w-[472px] h-[356px] md:h-[336px] bg-[#09090B] border-[0.5px] border-[#27272A] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg">
      
      {/* Header Section */}
      <CardHeader className="flex flex-col items-center px-4 gap-6 w-[360px] md:w-[472px] h-[260px] md:h-[240px]">
        <div className="flex flex-col items-center gap-1.5 w-[328px] h-[78px]">
          <h2 className="w-[328px] h-8 font-inter font-medium text-2xl leading-8 text-center tracking-[-0.006em] text-[#FAFAFA]">
            Multi-factor authentication
          </h2>
          <p className="w-[328px] h-10 font-inter text-sm leading-5 text-center text-[#A1A1AA]">
            Enter 6-digit code displayed in your authenticator app
          </p>
        </div>
      </CardHeader>

      {/* OTP Inputs Section */}
      <CardContent className="flex flex-col justify-center items-center w-[328px] h-10 gap-2">
        <div className="flex flex-row justify-center items-center w-[328px] h-10 gap-0 isolate">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`w-[54.67px] h-10 text-center text-[#FAFAFA] bg-[#09090B] ${
                i === 0
                  ? 'border border-[#3F3F46] rounded-l-md'
                  : i === 5
                  ? 'border-t border-r border-b border-[#3F3F46] rounded-r-md'
                  : 'border-t border-r border-b border-[#3F3F46]'
              } focus:ring-2 focus:ring-[#006FE8] focus:border-[#006FE8] flex-1 box-border`}
            />
          ))}
        </div>
      </CardContent>

      {/* Footer Buttons */}
      <CardFooter className="flex flex-col justify-center items-center gap-1.5 px-4 w-[328px] h-[94px]">
        <Button 
          className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] h-11 bg-[#006FE8] hover:bg-[#0061CC] rounded-md"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50.48%), #006FE8"
          }}
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#09090B]">
            Continue
          </span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-row justify-center items-center px-8 gap-2 w-[328px] h-11 rounded-md opacity-50 hover:opacity-100"
        >
          <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#FAFAFA]">
            Try another way
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
