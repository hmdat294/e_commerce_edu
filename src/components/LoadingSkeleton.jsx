import React from 'react';

// Skeleton cho Product Card
export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-tl-[30px] rounded-br-[30px] h-[140px] sm:h-[150px] lg:h-[160px] mb-3 sm:mb-4"></div>
      <div className="space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 sm:h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

// Skeleton cho Product Detail
export const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative z-10 max-w-[1280px] mx-auto pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* Left side - Product info */}
          <div className="flex-1 min-w-0 lg:min-w-[320px]">
            {/* Back button skeleton */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="h-8 sm:h-10 lg:h-12 bg-gray-200 rounded mb-4 sm:mb-6"></div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-6 sm:w-8"></div>
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            
            {/* Long description skeleton */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            {/* Price and button skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-16 sm:w-20"></div>
              <div className="h-10 sm:h-12 bg-gray-200 rounded w-full sm:w-48"></div>
            </div>
          </div>
          
          {/* Right side - Product image */}
          <div className="w-full lg:w-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-5 flex flex-col items-center mt-6 sm:mt-8 lg:mt-10">
            <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] bg-gray-200 rounded-xl sm:rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton cho Search results
export const SearchSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="max-w-[1280px] mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-36 sm:w-48 mb-6 sm:mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton cho Favorite page
export const FavoriteSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="max-w-[1280px] mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-24 sm:w-32 mb-6 sm:mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
          {[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}; 