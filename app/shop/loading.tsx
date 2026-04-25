export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-cream px-4 md:px-10 lg:px-20 py-8 md:py-14 animate-pulse">
      <div className="max-w-[1200px] mx-auto">
        <div className="h-10 w-40 bg-navy/8 rounded mb-8" />
        <div className="flex gap-3 mb-10">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-8 w-28 bg-navy/5 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-ivory rounded-xl overflow-hidden" style={{ boxShadow: '0 0 0 1px #E5DDD0' }}>
              <div className="h-[280px] bg-navy/5" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-navy/5 rounded" />
                <div className="h-5 w-40 bg-navy/8 rounded" />
                <div className="h-3 w-full bg-navy/5 rounded" />
                <div className="flex justify-between items-center mt-4">
                  <div className="h-5 w-14 bg-terracotta/10 rounded" />
                  <div className="h-8 w-24 bg-navy/8 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
