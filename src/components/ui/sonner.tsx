import type { CSSProperties } from 'react';
import { Toaster as Sonner } from 'sonner';

const TOASTER_Z_INDEX = 2147483647;
const TOASTER_OFFSET = 16;
const TOASTER_GAP = 12;

const TOAST_STYLE: CSSProperties = {
  zIndex: TOASTER_Z_INDEX,
  background: 'var(--card)',
  border: '1px solid var(--border)',
  color: 'var(--card-foreground)',
  boxShadow: '0 24px 60px -36px rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(16px)',
};

export function AppToaster() {
  return (
    <Sonner
      position="bottom-right"
      expand
      visibleToasts={3}
      gap={TOASTER_GAP}
      offset={TOASTER_OFFSET}
      mobileOffset={TOASTER_OFFSET}
      className="toaster"
      containerAriaLabel="Notifications"
      style={{ zIndex: TOASTER_Z_INDEX }}
      toastOptions={{ style: TOAST_STYLE }}
    />
  );
}
