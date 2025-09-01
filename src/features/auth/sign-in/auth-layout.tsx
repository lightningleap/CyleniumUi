

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="auth-layout h-svh w-full ">
      <div className="w-full h-full flex justify-center items-center auth-grid-vertical">
        <div className="w-full h-full flex justify-center items-center auth-grid-horizontal">
          <div className="grid grid-cols-1 md:grid-cols-2 relative h-full ">           
              {children}
            </div>
          </div>
        
      </div>
    </div>
  );
}
