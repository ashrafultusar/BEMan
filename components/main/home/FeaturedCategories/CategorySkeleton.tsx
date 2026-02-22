const CategorySkeleton = () => {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-64 bg-gray-200 mx-auto mb-10 rounded-md" />
  
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden">
              {/* Badge Skeleton */}
              <div className="absolute top-3 inset-x-0 flex justify-center">
                <div className="h-4 w-20 bg-gray-300 rounded-full" />
              </div>
              {/* Text Overlay Skeleton */}
              <div className="absolute bottom-6 inset-x-0 flex justify-center">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default CategorySkeleton;