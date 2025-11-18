'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import React, { useState } from 'react';

import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { ConfirmModal } from '@/src/components/modals/confirm-modal';
import { Input } from '@/src/components/ui/input/input';

export const TrashBox = () => {
  const { push } = useRouter();
  const params = useParams();
  const documents = useQuery(api.document.getTrash);
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.remove);

  const [search, setSearch] = useState('');

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleRedirect = (documentId: string) => {
    push(`/document/${documentId}`);
  };

  const handleRestore = (
    event: React.MouseEvent,
    documentId: Id<'documents'>,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored successfully',
      error: 'Failed to restore document',
    });
  };

  const handleRemove = (
    event: React.MouseEvent,
    documentId: Id<'documents'>,
  ) => {
    event.stopPropagation();
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: 'Removing document...',
      success: 'Document removed successfully',
      error: 'Failed to remove document',
    });

    if (params.documentId === documentId) {
      push('/');
    }
  };

  if (documents === undefined) {
    return null;
  }

  return (
    <div className={'text-sm'}>
      <div className={'flex items-center gap-x-1 p-2'}>
        <Search className={'h-4 w-4'} />
        <Input
          type={'text'}
          placeholder={'Search by page title...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={'h-7 bg-secondary px-2 focus-visible:ring-transparent'}
        />
      </div>
      <div className={'mt-2 px-1 pb-1'}>
        <p
          className={
            'hidden pb-2 text-center text-xs text-muted-foreground last:block'
          }
        >
          No documents found
        </p>
        {filterDocuments?.map((document) => (
          <div
            role={'button'}
            key={document._id}
            onClick={() => handleRedirect(document._id)}
            className={
              'flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5'
            }
          >
            <span className={'truncate pl-2'}>{document.title}</span>
            <div className={'flex items-center'}>
              <div
                role={'button'}
                className={
                  'rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }
                onClick={(e) => handleRestore(e, document._id)}
              >
                <Undo className={'h-4 w-4 text-muted-foreground'} />
              </div>
              <ConfirmModal onConfirm={(e) => handleRemove(e, document._id)}>
                <div
                  role={'button'}
                  className={
                    'rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }
                >
                  <Trash className={'h-4 w-4 text-muted-foreground'} />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
