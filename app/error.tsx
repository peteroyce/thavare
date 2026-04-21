'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="font-serif text-[32px] text-navy">Something went wrong</h1>
      <p className="text-text-2 text-center max-w-[400px]">
        We're sorry — an unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase bg-navy text-cream hover:bg-navy/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
