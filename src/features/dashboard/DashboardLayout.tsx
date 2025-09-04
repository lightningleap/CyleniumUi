import React from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#09090B] text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50"
        style={{ backgroundImage: 'url(/Background.svg)' }}
      />
      
      {/* Sidebar */}
      <Sidebar className="bg-black/60 backdrop-blur-sm border-r border-white/10" />
      
      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
