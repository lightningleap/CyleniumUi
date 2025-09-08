import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type NewUserFormProps = {
  onCancel: () => void;
  onSubmit: (values: NewUserFormValues) => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  role: z.enum(['admin', 'general']),
});

type NewUserFormValues = z.infer<typeof formSchema>;

export function NewUserForm({ onCancel, onSubmit }: NewUserFormProps) {
  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'general',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 dark:bg-[#09090B]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} className="dark:bg-[#09090B] dark:border-[#3F3F46] dark:text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" type="email" {...field} className="dark:bg-[#09090B] dark:border-[#3F3F46] dark:text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="dark:bg-[#09090B] dark:border-[#3F3F46] dark:text-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-[#09090B] dark:border-[#3F3F46]">
                  <SelectItem value="admin" className="dark:hover:bg-[#27272A]">Admin</SelectItem>
                  <SelectItem value="general" className="dark:hover:bg-[#27272A]">General User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="dark:border-[#3F3F46] dark:text-white">
            Cancel
          </Button>
          <Button type="submit" variant="bluebutton">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}