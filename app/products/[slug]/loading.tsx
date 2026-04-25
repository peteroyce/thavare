export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-cream px-4 md:px-10 lg:px-20 py-8 md:py-14 animate-pulse">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="h-3 w-48 bg-navy/5 rounded mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Image skeleton */}
          <div className="aspect-square bg-navy/5 rounded-2xl" />

          {/* Info skeleton */}
          <div className="space-y-5 py-4">
            <div className="h-3 w-24 bg-navy/5 rounded" />
            <div className="h-10 w-64 bg-navy/8 rounded" />
            <div className="h-4 w-48 bg-navy/5 rounded" />
            <div className="h-8 w-20 bg-terracotta/10 rounded mt-4" />
            <div className="space-y-2 mt-6">
              <div className="h-3 w-full bg-navy/5 rounded" />
              <div className="h-3 w-5/6 bg-navy/5 rounded" />
              <div className="h-3 w-4/6 bg-navy/5 rounded" />
            </div>
            <div className="flex gap-2 mt-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-7 w-16 bg-navy/5 rounded-full" />
              ))}
            </div>
            <div className="h-12 w-full bg-navy/8 rounded-lg mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
