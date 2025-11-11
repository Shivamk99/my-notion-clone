'use client';

import Link from 'next/link';

import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/src/components/ui/button/button';
import { SignInButton } from '@clerk/clerk-react';

import CircularProgress from '../circular-progress/circular-progress';

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const isSignin = !isAuthenticated && !isLoading;
  const isSignout = isAuthenticated && !isLoading;

  return (
    <div className={'max-w-3xl space-y-4'}>
      <h1 className={'text-3xl font-bold sm:text-5xl md:text-6xl'}>
        Your Ideas, Documents, and Plans. Unified. Welcom to{' '}
        <span className={'underline'}>Notion</span>
      </h1>
      <h3 className={'text-base font-medium sm:text-xl md:text-2xl'}>
        Notion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <div className={'item-center flex w-full justify-center'}>
          <CircularProgress size={'lg'} />
        </div>
      )}
      {isSignin && (
        <SignInButton mode={'modal'}>
          <Button>
            Get Notion Free <ArrowRight className={'ml-2 h-4 w-4'} />
          </Button>
        </SignInButton>
      )}
      {isSignout && (
        <Button asChild>
          <Link href={'/documents'}>
            Enter Notion <ArrowRight className={'ml-2 h-4 w-4'} />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Heading;
