import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-[#09090B] overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url(/Background.svg)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <img src="/logo/Cylenium.svg" alt="Cylenium" className="w-[160px] mb-16" />
        
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Secure your endpoints.<br />
            Maintain seamless access.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of organizations that trust Cylenium Cloud for their security needs.
          </p>
          <div className="pt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium px-8"
              onClick={() => navigate({ to: '/sign-in' })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}