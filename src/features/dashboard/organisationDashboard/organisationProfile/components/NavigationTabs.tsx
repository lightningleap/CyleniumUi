import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewUserForm } from './users/newUserForm';

interface NavigationTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    onSearch: (value: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange, onSearch }: NavigationTabsProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center w-full gap-4">
            {/* Tabs - Full width on mobile, left-aligned on larger screens */}
            <div className="w-full sm:w-auto overflow-x-auto sm:flex-1 sm:flex sm:justify-start">
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={onTabChange}
                    className="w-full sm:w-[364px]"
                >
                    <TabsList className="bg-zinc-100 w-full flex justify-between">
                        <TabsTrigger
                            value="users"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Users
                        </TabsTrigger>
                        <TabsTrigger
                            value="devices"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Devices
                        </TabsTrigger>
                        <TabsTrigger
                            value="billing"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Billing
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
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
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-500" />
                        </div>
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 h-9 bg-white border-zinc-200 text-sm w-full"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-zinc-200 flex-shrink-0"
                    >
                        <Filter className="h-4 w-4 text-zinc-500" />
                    </Button>
                </div>

                {/* New User Dialog - Only show when Users tab is active */}
                {activeTab === 'users' && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="bluebutton" className="w-full sm:w-auto h-9">
                                New User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <div className="flex items-center justify-between">
                                    <DialogTitle>Create new user</DialogTitle>
                                </div>
                            </DialogHeader>
                            <div className="border-t my-4" />
                            <NewUserForm />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}
