import { type VariantProps, cva } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '@/src/lib/utils';

const circularProgressVariants = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
    defaultVariants: {
      size: 'default',
    },
  },
});

interface CircularProgressProps
  extends VariantProps<typeof circularProgressVariants> {}

export const CircularProgress = ({ size }: CircularProgressProps) => {
  return <Loader className={cn(circularProgressVariants({ size }))} />;
};

export default CircularProgress;
