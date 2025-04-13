const ShimmerLoader = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="h-40 bg-card-background animate-pulse rounded-lg"></div>  {/* Banner Shimmer */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card-background h-56 animate-pulse rounded-lg"></div>  {/* Course Shimmer */}
          <div className="bg-card-background h-56 animate-pulse rounded-lg"></div>
          <div className="bg-card-background h-56 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerLoader;
  