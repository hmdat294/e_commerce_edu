import React from 'react';

// Skeleton cho Product Card
export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

// Skeleton cho Product Detail
export const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative z-10 max-w-[1280px] mx-auto pt-10 pb-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Left side - Product info */}
          <div className="flex-1 min-w-[320px]">
            {/* Back button skeleton */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-5 h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            
            {/* Long description skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            {/* Price and button skeleton */}
            <div className="flex items-center gap-10">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-12 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          
          {/* Right side - Product image */}
          <div className="w-full md:w-[500px] bg-white rounded-3xl shadow-2xl p-5 flex flex-col items-center mt-10">
            <div className="w-full h-[300px] bg-gray-200 rounded-2xl"></div>
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
      <div className="max-w-[1280px] mx-auto py-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-20">
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
      <div className="max-w-[1280px] mx-auto py-8">
        <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-20">
          {[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}; 