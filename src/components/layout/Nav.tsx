'use client';

import React, { useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import { LogOutIcon } from 'lucide-react';
import ConfirmDialog from '../common/ConfirmDialog';
import { signOut, useSession } from 'next-auth/react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Link from 'next/link';

const Nav = () => {
  const [opened, setOpened] = useState(false);

  const { status } = useSession();
  return (
    <div className="flex items-center justify-center w-full lg:px-36 px-4 py-2 fixed top-0  backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="flex justify-between w-full max-w-[1280px]">
        <div className="flex items-center gap-6">
          <div className="font-semibold text-xl">CloudScribe</div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
                <Link href="/protected/notes">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Notes</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          {status === 'authenticated' && <LogOutIcon className="cursor-pointer" onClick={() => setOpened(!opened)} />}

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
