import React from 'react';
import ThemeToggle from '../ThemeToggle';

const Nav = () => {
  return (
    <div className="flex items-center justify-center w-full lg:px-36 px-4 py-2 bg-[rgba(0,0,0,0.2)]">
      <div className="flex justify-between w-full max-w-[1280px]">
        <div className="font-semibold text-xl">CloudScribe</div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Nav;
