import { useMemo } from 'react';

export function useIsMac(): boolean {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false;

    return (
      /Mac|iPhone|iPad|iPod/.test(navigator.platform) ||
      /Macintosh/.test(navigator.userAgent)
    );
  }, []);
}
