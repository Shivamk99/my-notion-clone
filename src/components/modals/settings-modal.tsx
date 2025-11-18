'use client';

import { useSettings } from '@/hooks/settings/use-settings';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/command/dialog';
import { Label } from '../ui/label/label';
import { ToggleBtn } from '../ui/toggle-btn/toggle-btn';

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className={'border-b pb-3'}>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className={'flex items-center justify-between'}>
          <div className={'flex flex-col gap-y-1'}>
            <Label>Appearance</Label>
            <span className={'text-[0.8rem] text-muted-foreground'}>
              Customize how Notion looks on your device
            </span>
          </div>
          <ToggleBtn />
        </div>
      </DialogContent>
    </Dialog>
  );
};
