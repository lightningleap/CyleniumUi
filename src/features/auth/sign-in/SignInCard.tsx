import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useNavigate } from "@tanstack/react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { authenticate, setUserSession } from "@/lib/auth"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

type FormData = z.infer<typeof formSchema>

export function SignInCard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const { user, error } = await authenticate(data.email, data.password)
      
      if (error || !user) {
        form.setError('root', { message: error || 'Authentication failed' })
        return
      }
      
      // Set user session
      setUserSession(user)
      
      // Redirect to MFA page
      navigate({ to: '/mfa' })
    } catch (error) {
      console.error('Login failed:', error)
      form.setError('root', { 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-h-[430px] px-10 py-5 rounded-lg bg-black border border-white/10 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-sm text-center text-[#006FE8] font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-center text-[#FAFAFA] text-xl font-medium">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            {form.formState.errors.root && (
              <div className="text-red-400 text-sm text-center">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#FAFAFA]">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email"
                      className="text-[#FAFAFA] border-white/20 bg-black/50 focus-visible:ring-[#006FE8]"
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-[#FAFAFA]">Password</FormLabel>
                    <a href="/forgotPassword" className="text-sm text-[#FAFAFA] underline underline-offset-2">
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password"
                      className="text-[#FAFAFA] border-white/20 bg-black/50 focus-visible:ring-[#006FE8]"
                      disabled={isLoading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full">
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
