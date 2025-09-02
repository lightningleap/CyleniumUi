import ForgotPassword from '@/features/auth/forgotPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgotPassword')({
  component: ForgotPassword,
})
