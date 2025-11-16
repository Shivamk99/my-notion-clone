'use client';

import { usePathname } from 'next/navigation';

import { ElementRef, useEffect, useRef, useState } from 'react';

import { useMutation } from 'convex/react';
import {
  ChevronLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from 'lucide-react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

import { api } from '@/convex/_generated/api';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover/popover';
import { cn } from '@/src/lib/utils';

import { Item } from '../item';
import { TrashBox } from './TrashBox';
import { DocumentList } from './document-list';
import UserItem from './user-item';

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const create = useMutation(api.document.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    // How much user can resize the sidebar
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : `calc(100% - 240px)`,
      );

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('left', '0');
      navbarRef.current.style.setProperty('width', `100%`);

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const handleCreateDocument = () => {
    const promise = create({
      title: 'New document',
    });

    toast.promise(promise, {
      loading: 'Creating document...',
      success: 'Document created successfully',
      error: 'Failed to create document',
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar relative z-[999999] flex h-full w-60 flex-col overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0',
        )}
      >
        <div
          role={'button'}
          onClick={collapse}
          className={cn(
            'dark-hover:bg-neutral-600 absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100',
            isMobile && 'opacity-100',
          )}
        >
          <ChevronLeft className={'h-6 w-6'} />
        </div>
        <div>
          <UserItem />
          <Item label={'Search'} icon={Search} isSearch onClick={() => {}} />
          <Item
            label={'Settings'}
            icon={Settings}
            isSearch
            onClick={() => {}}
          />
          <Item
            label={'New page'}
            icon={PlusCircle}
            onClick={handleCreateDocument}
          />
        </div>
        <div className={'mt-4'}>
          <DocumentList />
          <Item
            label={'Add a page'}
            icon={PlusCircle}
            onClick={handleCreateDocument}
          />
          <Popover>
            <PopoverTrigger className={'mt-4 w-full'}>
              <Item
                label={'Trash'}
                icon={Trash}
                // onClick={handleCreateDocument}
              />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? 'bottom' : 'right'}
              className={'w-72 p-0'}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={
            'absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
          }
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full',
        )}
      >
        <nav className={'w-full bg-transparent px-3 py-2'}>
          {isCollapsed && (
            <MenuIcon
              role={'button'}
              onClick={resetWidth}
              className={'h-6 w-6 text-muted-foreground'}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
