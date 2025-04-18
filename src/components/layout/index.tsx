import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex w-full  flex-col overflow-x-hidden">
      <Nav />
      <div className=" min-h-[calc(100vh-4rem)] w-full mt-24">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
