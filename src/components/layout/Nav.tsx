'use client';

import { LogOutIcon, Menu } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { signOut, useSession } from 'next-auth/react';
import ThemeToggle from '../ThemeToggle';
import { useState } from 'react';
import ConfirmDialog from '../common/ConfirmDialog';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Nav = ({
  logo = {
    url: '/logo.png',
    src: '/logo.png',
    alt: 'logo',
    title: 'Shadcnblocks.com',
  },
  menu = [
    { title: 'Home', url: '/' },

    {
      title: 'Notes',
      url: '/protected/notes',
    },
  ],
  auth = {
    login: { title: 'Login', url: '/login' },
    signup: { title: 'Sign up', url: '/signup' },
  },
}: Navbar1Props) => {
  const session = useSession();

  const [opened, setOpened] = useState(false);
  return (
    <div className="flex w-full items-center justify-center px-4 lg:px-32 fixed top-0  backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 z-50">
      <section className="py-4 max-w-[1280px] w-full">
        <div className="container">
          {/* Desktop Menu */}
          <nav className="hidden justify-between lg:flex">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <a href={logo.url} className="flex items-center gap-2">
                <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              </a>
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <ThemeToggle />
              {session.status === 'authenticated' ? (
                <div className="flex gap-2">
                  <LogOutIcon className="cursor-pointer" onClick={() => setOpened(!opened)} />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                  <Button size="sm">
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                  </Button>
                </div>
              )}
            </div>
          </nav>

          <ConfirmDialog
            open={opened}
            setOpened={setOpened}
            positiveCallback={() => {
              signOut();
            }}>
            <p>Are you sure you want to logout?</p>
          </ConfirmDialog>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href={logo.url} className="flex items-center gap-2">
                <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              </a>

              <Sheet>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                </div>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <a href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      {session.status === 'authenticated' ? (
                        <div onClick={() => setOpened(!opened)} className="flex items-center gap-2 cursor-pointer">
                          <span className="font-semibold">Logout</span>
                          <LogOutIcon className="cursor-pointer" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Button variant="outline">
                            <a href={auth.login.url}>{auth.login.title}</a>
                          </Button>
                          <Button>
                            <a href={auth.signup.url}>{auth.signup.title}</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}>
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>}
      </div>
    </a>
  );
};

export default Nav;
