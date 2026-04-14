// components/ui/ToastContainer.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '@/lib/toast';
import { Toast } from '@/components/ui/Toast';

export function ToastContainer() {
  const { toasts, remove } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-slide-in pointer-events-auto">
          <Toast toast={toast} onDismiss={remove} />
        </div>
      ))}
    </div>,
    document.body
  );
}
