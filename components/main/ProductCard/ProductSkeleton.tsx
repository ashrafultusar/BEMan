const ProductSkeleton = () => {
    return (
      <div className="w-full animate-pulse">
        {/* Image Block */}
        <div className="relative aspect-[3/4] bg-gray-100 mb-4 rounded-sm" />
        
        {/* Text Blocks */}
        <div className="space-y-2 px-1">
          <div className="h-2.5 bg-gray-100 w-full rounded-sm" />
          <div className="h-2.5 bg-gray-100 w-1/3 rounded-sm" />
        </div>
      </div>
    );
  };
  
  export default ProductSkeleton;