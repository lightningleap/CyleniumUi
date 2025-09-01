import { createFileRoute } from '@tanstack/react-router'
import Mfa from '../../features/auth/mfa'

export const Route = createFileRoute('/(auth)/mfa')({
  component: Mfa,
})
