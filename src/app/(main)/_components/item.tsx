'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, LucideIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useIsMac } from '@/hooks/check-mac/useIsMac';
import { Skeleton } from '@/src/components/ui/skeleton/skeleton';
import { cn } from '@/src/lib/utils';

interface ItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpanded?: () => void;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpanded,
  label,
  icon: Icon,
  onClick,
}: ItemProps) => {
  const isMac = useIsMac();
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const { push } = useRouter();
  const create = useMutation(api.document.create);

  const handleExpanded = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (onExpanded) onExpanded();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!id) return;

    const promise = create({ title: 'untitled', parentDocument: id })
      .then((documentId) => {
        if (!expanded) {
          onExpanded?.();
        }

        push(`/documents/${documentId}`);
      })
      .catch((error) => {
        console.error(error.message);
      });

    toast.promise(promise, {
      loading: 'Creating document...',
      success: 'Document created successfully',
      error: 'Failed to create document',
    });
  };

  return (
    <div
      role={'button'}
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
        cursor: 'pointer',
      }}
      className={cn(
        'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        active && 'bg-primary/5 text-primary',
      )}
    >
      {!!id && (
        <div
          role={'button'}
          className={
            'mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600'
          }
          onClick={handleExpanded}
        >
          <ChevronIcon
            className={'h-4 w-4 shrink-0 text-muted-foreground/50'}
          />
        </div>
      )}
      {documentIcon ? (
        <div className={'mr-2 shrink-0 text-[18px]'}>{documentIcon}</div>
      ) : (
        <Icon className={'mr-2 h-[18px] shrink-0 text-muted-foreground'} />
      )}
      <span className={'truncate'}>{label}</span>
      {isSearch && (
        <kbd
          className={
            'pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[18px] font-medium text-muted-foreground opacity-100'
          }
        >
          <span className={'text-xs'}>{isMac ? '⌘ ' : 'Ctrl '}</span>
          {isMac ? 'K' : '+ K'}
        </kbd>
      )}
      {!!id && (
        <div className={'ml-auto flex items-center gap-x-2'}>
          <div
            role={'button'}
            onClick={onCreate}
            className={
              'ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600'
            }
          >
            <PlusIcon className={'h-4 w-4 text-muted-foreground'} />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : '12px',
      }}
      className={'flex gap-x-2 py-[3px]'}
    >
      <Skeleton className={'h-4 w-4'} />
      <Skeleton className={'h-4 w-[30%]'} />
    </div>
  );
};
