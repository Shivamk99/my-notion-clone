'use client';

import { useRouter } from 'next/navigation';

import { useConvexAuth } from 'convex/react';

import CircularProgress from '../(marketing)/_components/circular-progress/circular-progress';
import Navigation from './_components/navigation/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  if (isLoading)
    return (
      <div className={'flex h-full items-center justify-center'}>
        <CircularProgress size={'lg'} />
      </div>
    );

  if (!isAuthenticated) {
    // Client-safe redirect
    router.replace('/');
    return null;
  }

  return (
    <div className={'flex h-full dark:bg-[#1F1F1F]'}>
      <Navigation />
      <main className={'h-full flex-1 overflow-y-auto'}>{children}</main>
    </div>
  );
}
