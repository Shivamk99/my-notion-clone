'use client';

import React from 'react';

import Image from 'next/image';

import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Button } from '@/src/components/ui/button/button';
import { useUser } from '@clerk/clerk-react';

export default function DocumentsPage() {
  const { user } = useUser();

  const create = useMutation(api.document.create);

  const onCreate = () => {
    const promise = create({
      title: 'New Note',
    });

    toast.promise(promise, {
      loading: 'Creating note...',
      success: 'Note created successfully!',
      error: 'Failed to create note.',
    });
  };

  return (
    <div
      className={'flex h-full flex-col items-center justify-center space-x-4'}
    >
      <Image
        src={'/empty.png'}
        alt={'empty'}
        width={300}
        height={300}
        className={'dark:hidden'}
      />
      <Image
        src={'/empty-dark.png'}
        alt={'empty'}
        width={300}
        height={300}
        className={'hidden dark:block'}
      />
      <h2>Welcome to Notion Clone {user?.fullName}</h2>
      <p className={'text-muted-foreground'}>
        You don&apos;t have any notes yet. Create one to get started.
      </p>

      <Button onClick={onCreate} className={'mt-4'}>
        <PlusCircle className={'mr-2 h-4 w-4'} /> Create note
      </Button>
    </div>
  );
}
