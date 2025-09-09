import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast-provider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createUser, updateUser } from '../api/users'

const formSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer'] as const),
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Please enter a name'),
})

type FormValues = z.infer<typeof formSchema>

interface NewUserModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  initialData?: {
    id: string
    role: 'admin' | 'editor' | 'viewer'
    email: string
    name: string
  }
}

export function NewUserModal({ open, onClose, onSuccess, initialData }: NewUserModalProps) {
  const [role, setRole] = React.useState<'admin' | 'editor' | 'viewer'>(initialData?.role || 'viewer')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: role,
      email: initialData?.email || '',
      name: initialData?.name || '',
    },
  })

  React.useEffect(() => {
    if (initialData) {
      setRole(initialData.role)
      form.reset({
        role: initialData.role,
        email: initialData.email,
        name: initialData.name
      })
    } else {
      setRole('viewer')
      form.reset({
        role: 'viewer',
        email: '',
        name: ''
      })
    }
  }, [form, initialData])

  const { addToast } = useToast()

  const onSubmit = async (data: FormValues) => {
    try {
      if (initialData) {
        await updateUser({ ...data, id: initialData.id })
        addToast({
          title: 'Success',
          description: 'User updated successfully',
          duration: 5000
        })
      } else {
        await createUser(data)
        addToast({
          title: 'Success',
          description: 'User created successfully',
          duration: 5000
        })
      }
      onSuccess?.() // Trigger refresh of user list if provided
      onClose()
    } catch (error) {
      console.error('Error:', error)
      addToast({
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} user. Please try again.`,
        duration: 5000
      })
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[352px] sm:w-[471px] p-0 max-w-[calc(100vw-32px)]">
        <DialogHeader className="px-6 py-4 border-b border-[#E4E4E7] dark:border-[#3F3F46]">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold leading-7 tracking-[-0.006em] text-[#09090B] dark:text-white">
              {initialData ? 'Edit User' : 'Create New User'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[#09090B] dark:text-white">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full h-10 px-3 bg-white dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#3F3F46] rounded-md text-sm text-[#09090B] dark:text-white placeholder:text-[#71717A] dark:placeholder:text-[#A1A1AA] focus-visible:ring-2 focus-visible:ring-[#006FE8] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B]"
              placeholder="Enter name"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#09090B] dark:text-white">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full h-10 px-3 bg-white dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#3F3F46] rounded-md text-sm text-[#09090B] dark:text-white placeholder:text-[#71717A] dark:placeholder:text-[#A1A1AA] focus-visible:ring-2 focus-visible:ring-[#006FE8] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B]"
              placeholder="Enter email address"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="role" className="text-[#09090B] dark:text-white">Role</Label>
            <Select
              value={role}
              onValueChange={(value: 'admin' | 'editor' | 'viewer') => {
                setRole(value)
                form.setValue('role', value, { shouldValidate: true })
              }}
            >
              <SelectTrigger
                id="role"
                className="w-full h-10 px-3 bg-white dark:bg-[#09090B] border-[#E4E4E7] dark:border-[#3F3F46] text-sm text-[#71717A] dark:text-[#A1A1AA] hover:bg-[#F4F4F5]/80 dark:hover:bg-[#27272A]/80 focus-visible:ring-2 focus-visible:ring-[#006FE8] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B]"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#09090B] border-[#E4E4E7] dark:border-[#3F3F46]">
                <SelectItem value="admin" className="text-[#09090B] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]">Administrator</SelectItem>
                <SelectItem value="editor" className="text-[#09090B] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]">Editor</SelectItem>
                <SelectItem value="viewer" className="text-[#09090B] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]">Viewer</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.role.message}</p>
            )}
          </div>


        </form>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#E4E4E7] dark:border-[#3F3F46]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 px-4 border-[#E4E4E7] dark:border-[#3F3F46] text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="h-9 px-4 bg-[#006FE8] hover:bg-[#006FE8]/90 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {form.formState.isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
