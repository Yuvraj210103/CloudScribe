'use client';

import React, { useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import { LogOutIcon } from 'lucide-react';
import ConfirmDialog from '../common/ConfirmDialog';
import { signOut } from 'next-auth/react';

const Nav = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex items-center justify-center w-full lg:px-36 px-4 py-2 bg-[rgba(0,0,0,0.2)]">
      <div className="flex justify-between w-full max-w-[1280px]">
        <div className="font-semibold text-xl">CloudScribe</div>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          <LogOutIcon className="cursor-pointer" onClick={() => setOpened(!opened)} />

          <ConfirmDialog
            open={opened}
            setOpened={setOpened}
            positiveCallback={() => {
              signOut();
            }}>
            <p>Are you sure you want to logout?</p>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  );
};

export default Nav;
