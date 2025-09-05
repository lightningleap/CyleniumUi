import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NavigationTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    onSearch: (value: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange, onSearch }: NavigationTabsProps) {
    return (
        <div className="flex flex-row justify-end items-center w-full h-10 gap-4">
            {/* Tabs Group */}
            <div className="flex-1 flex justify-start">
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={onTabChange}
                    className="w-[364px]"
                >
                    <TabsList className="bg-zinc-100">
                        <TabsTrigger
                            value="users"
                            className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Users
                        </TabsTrigger>
                        <TabsTrigger
                            value="devices"
                            className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Devices
                        </TabsTrigger>
                        <TabsTrigger
                            value="billing"
                            className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Billing
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500"
                        >
                            Settings
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-2 w-[283px]">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-500" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 h-9 bg-white border-zinc-200 text-sm"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-zinc-200"
                >
                    <Filter className="h-4 w-4 text-zinc-500" />
                </Button>
            </div>
        </div>
    );
}
