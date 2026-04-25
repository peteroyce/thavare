import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline' | 'outline-light' | 'outline-cream' | 'white';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 relative overflow-hidden focus:outline-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-ivory shadow-[0_0_0_1px_var(--terracotta)] ' +
    'hover:-translate-y-px hover:shadow-[0_0_0_1px_var(--terra-h),0_6px_20px_rgba(179,95,66,0.35)] ' +
    'active:translate-y-0',
  ghost:
    'bg-transparent text-cream/75 border border-cream/20 ' +
    'hover:border-cream/45 hover:text-cream hover:bg-cream/5',
  outline:
    'bg-transparent text-navy border border-navy/25 ' +
    'hover:border-navy/50 hover:bg-navy/5',
  'outline-light':
    'bg-transparent text-cream/70 border border-cream/20 ' +
    'hover:border-cream/40 hover:text-cream hover:bg-cream/5',
  'outline-cream':
    'bg-transparent text-cream/75 border border-cream/20 ' +
    'hover:border-cream/45 hover:text-cream',
  white:
    'bg-white text-terracotta font-bold shadow-[0_0_0_1px_white,0_4px_20px_rgba(0,0,0,0.15)] ' +
    'hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_white,0_8px_28px_rgba(0,0,0,0.2)]',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
);
Button.displayName = 'Button';
