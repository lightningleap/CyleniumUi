import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useNavigate } from "@tanstack/react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

export function SignInCard() {
  const navigate = useNavigate()
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Login attempt with:', data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Redirect to MFA page after successful login
      navigate({ to: '/mfa' })
    } catch (error) {
      console.error('Login failed:', error)
      // You can set form errors here if needed
      // form.setError('root', { message: 'Login failed. Please try again.' })
    }
  }

  return (
    <Card className="w-full max-h-[430px] px-10 py-5 rounded-2xl bg-black border border-white/10 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-sm text-center text-[#006FE8] font-bold">Welcome back!</CardTitle>
        <CardDescription className="text-center text-[#FAFAFA] text-xl font-medium">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
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
                    <a href="/forgotPassword" className="text-sm text-[#FAFAFA] hover:underline underline-offset-2">
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password"
                      className="text-[#FAFAFA] border-white/20 bg-black/50 focus-visible:ring-[#006FE8]"
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
              variant="default" 
              size="lg" 
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Signing in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
