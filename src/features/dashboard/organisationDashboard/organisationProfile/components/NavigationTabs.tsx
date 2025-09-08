import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewUserForm } from './users/newUserForm';
import { useState } from 'react';

interface NavigationTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    onSearch: (value: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange, onSearch }: NavigationTabsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFormSubmit = (values: any) => {
        // Handle form submission here
        console.log('Form submitted:', values);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            {/* Tabs - Full width on mobile, left-aligned on larger screens */}
            <div className="w-full sm:w-auto overflow-x-auto sm:flex-1 sm:flex sm:justify-start">
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={onTabChange}
                    className="w-full sm:w-[364px] dark:bg-[#27272A]"
                >
                    <TabsList className="bg-zinc-100 w-full flex justify-between dark:bg-[#27272A]">
                        <TabsTrigger
                            value="users"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 dark:data-[state=active]:bg-[#09090B] dark:data-[state=active]:text-white"
                        >
                            Users
                        </TabsTrigger>
                        <TabsTrigger
                            value="devices"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 dark:data-[state=active]:bg-[#09090B] dark:data-[state=active]:text-white"
                        >
                            Devices
                        </TabsTrigger>
                        <TabsTrigger
                            value="billing"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 dark:data-[state=active]:bg-[#09090B] dark:data-[state=active]:text-white"
                        >
                            Billing
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 dark:data-[state=active]:bg-[#09090B] dark:data-[state=active]:text-white"
                        >
                            Settings
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Search and Filter - Full width on mobile, right-aligned on larger screens */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Search and Filter - Side by side on all screen sizes */}
                <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none dark:text-white ">
                            <Search className="h-4 w-4 text-zinc-500 dark:text-white" />
                        </div>
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 h-9 bg-white border-zinc-200 text-sm w-full dark:bg-[#09090B] dark:text-white dark:border-[#3F3F46]"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-zinc-200 flex-shrink-0 dark:border-[#3F3F46]"
                    >
                        <Filter className="h-4 w-4 text-zinc-500 dark:text-white" />
                    </Button>
                </div>

                {/* New User Dialog - Only show when Users tab is active */}
                {activeTab === 'users' && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="bluebutton" className="w-full sm:w-auto h-9">
                                New User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] dark:bg-[#09090B]">
                            <DialogHeader>
                                <div className="flex items-center justify-between dark:bg-[#09090B]">
                                    <DialogTitle>Create new user</DialogTitle>
                                </div>
                            </DialogHeader>
                            <div className="border-t my-4 dark:border-[#3F3F46]" />
                            <NewUserForm 
                                onCancel={() => setIsDialogOpen(false)}
                                onSubmit={handleFormSubmit}
                            />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}
