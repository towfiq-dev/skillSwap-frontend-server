import { DashboardSideBar } from '@/components/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <DashboardSideBar></DashboardSideBar>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </div>
    );
};

export default DashboardLayout;