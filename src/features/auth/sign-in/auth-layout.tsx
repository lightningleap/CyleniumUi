import SignLeftImage from "@/assets/SignInImages/cyleniumSignLeftBg.jpg"
import CyleniumLogo from "../../../../public/logo/Cylenium.svg"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
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

        {/* Right Side - Content Area */}
        <div className="flex flex-col w-full items-center justify-center p-4 overflow-y-auto relative bg-[#09090B]">
          {/* Grid Background */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(/Background.svg)' }}
          />
          {/* Logo for medium and small screens */}
          <div className="absolute top-40 left-36 lg:hidden">
            <img src={CyleniumLogo} alt="Logo" className="h-[58px] w-[95px]" />
          </div>
          
          <div className="w-full max-w-[472px] mt-16 lg:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
