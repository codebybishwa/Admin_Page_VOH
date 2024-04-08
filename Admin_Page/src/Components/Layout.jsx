import React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Render the NavBar */}
      <NavBar />

      {/* Main content area with sidebar and children components */}
      <div className="flex flex-1">
        {/* Render the SideBar */}
        <SideBar />

        {/* Main content area for routed components */}
        <div className="ml-5 flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
