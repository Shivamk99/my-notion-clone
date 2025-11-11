'use client';

import Link from 'next/link';

import { useConvexAuth } from 'convex/react';

import { useScrollTop } from '@/hooks/scroll-to-top/use-scroll-top';
import { Button } from '@/src/components/ui/button/button';
import { ToggleBtn } from '@/src/components/ui/toggle-btn/toggle-btn';
import { cn } from '@/src/lib/utils';
import { SignInButton, UserButton } from '@clerk/clerk-react';

import { CircularProgress } from '../circular-progress/circular-progress';
import { Logo } from '../logo/logo';

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  const isSignin = !isAuthenticated && !isLoading;
  const isSignout = isAuthenticated && !isLoading;

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div
        className={
          'flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'
        }
      >
        {isLoading && <CircularProgress />}
        {isSignin && (
          <>
            <SignInButton mode={'modal'}>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignInButton>
              <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isSignout && (
          <>
            <Button variant={'ghost'} size={'sm'} asChild>
              <Link href={'/documents'}>Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ToggleBtn />
      </div>
    </div>
  );
};

export default Navbar;
