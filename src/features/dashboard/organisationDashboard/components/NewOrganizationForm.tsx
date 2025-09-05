import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/toast-provider';

interface FormData {
  orgName: string;
  orgEmail: string;
  adminName: string;
  adminEmail: string;
  address: string;
}

interface FormErrors {
  orgName?: string;
  orgEmail?: string;
  adminName?: string;
  adminEmail?: string;
}

export function NewOrganizationForm() {
  const router = useRouter();
  const { addToast } = useToast();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    orgName: '',
    orgEmail: '',
    adminName: '',
    adminEmail: '',
    address: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.orgName.trim()) {
      newErrors.orgName = 'Organization name is required';
    }
    
    if (!formData.orgEmail) {
      newErrors.orgEmail = 'Organization email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.orgEmail)) {
      newErrors.orgEmail = 'Please enter a valid email address';
    }
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    
    if (!formData.adminEmail) {
      newErrors.adminEmail = 'Admin email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // await createOrganization(formData);
      console.log('Form submitted:', formData);
      
      // Show success toast
      addToast({
        title: 'Success',
        description: 'Organization successfully created',
        duration: 5000
      });
      
      // Navigate to organization list
      router.navigate({ to: '/organisationDashboard' });
    } catch (error) {
      console.error('Error creating organization:', error);
      addToast({
        title: 'Error',
        description: 'Failed to create organization. Please try again.',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.navigate({ to: '/organisationDashboard' });
  };

  return (
    <div className="mx-auto p-6 bg-white sm:w-[560px] w-full">
      <div className="flex flex-col gap-1 mb-5">
        <h1 className="text-2xl font-bold">Create Organization</h1>
        <p className="text-sm text-gray-500">Fill in the details below to create a new organization.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input 
              id="orgName" 
              value={formData.orgName}
              onChange={handleChange}
              placeholder="Enter organization name" 
              className={errors.orgName ? 'border-red-500' : ''}
            />
            {errors.orgName && (
              <p className="text-sm text-red-500">{errors.orgName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgEmail">Organization Email</Label>
            <Input 
              id="orgEmail" 
              type="email" 
              value={formData.orgEmail}
              onChange={handleChange}
              placeholder="Enter organization email" 
              className={errors.orgEmail ? 'border-red-500' : ''}
            />
            {errors.orgEmail && (
              <p className="text-sm text-red-500">{errors.orgEmail}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adminName">Admin Name</Label>
            <Input 
              id="adminName" 
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Enter admin name" 
              className={errors.adminName ? 'border-red-500' : ''}
            />
            {errors.adminName && (
              <p className="text-sm text-red-500">{errors.adminName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input 
              id="adminEmail" 
              type="email" 
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder="Enter admin email" 
              className={errors.adminEmail ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              This person will receive an email with a link to set up the platform
            </p>
            {errors.adminEmail && (
              <p className="text-sm text-red-500">{errors.adminEmail}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Textarea 
              id="address" 
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter organization address" 
              className="min-h-[80px]"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={handleCancel}
            className="px-6"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="bluebutton"
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
