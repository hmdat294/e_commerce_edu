import React, { useEffect, useState, useCallback } from 'react';
import { getCookie, setCookie, removeCookie } from '../../cookie/cookie';

export default function Detail({ data: productDetail }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!productDetail) return;
    let viewedIds = [];
    try {
      viewedIds = JSON.parse(getCookie('viewedProducts') || '[]');
    } catch { }
    if (!viewedIds.includes(productDetail.id)) {
      viewedIds.unshift(productDetail.id);
      setCookie('viewedProducts', JSON.stringify(viewedIds.slice(0, 20)));
    }
  }, [productDetail]);

  useEffect(() => {
    function syncLike() {
      if (!productDetail) return;
      try {
        const likedIds = JSON.parse(getCookie('likedProducts') || '[]');
        setIsLiked(likedIds.includes(productDetail.id));
      } catch {
        setIsLiked(false);
      }
    }
    window.addEventListener('likeChange', syncLike);
    syncLike();
    return () => window.removeEventListener('likeChange', syncLike);
  }, [productDetail]);

  const displayRate = (() => {
    if (!productDetail?.rate) return 0;
    let rate = parseInt(productDetail.rate.toString().slice(0, 1));
    return rate > 5 ? rate / 2 : rate;
  })();

  const handleLike = useCallback(() => {
    if (!productDetail) return;
    let likedIds = [];
    try {
      likedIds = JSON.parse(getCookie('likedProducts') || '[]');
    } catch { }
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    if (newLiked) {
      if (!likedIds.includes(productDetail.id)) {
        likedIds.push(productDetail.id);
        window.dispatchEvent(new CustomEvent('newLike', { detail: { productName: productDetail.name, action: 'add' } }));
      }
    } else {
      likedIds = likedIds.filter(id => id !== productDetail.id);
      window.dispatchEvent(new CustomEvent('newLike', { detail: { productName: productDetail.name, action: 'remove' } }));
    }
    likedIds.length ? setCookie('likedProducts', JSON.stringify(likedIds)) : removeCookie('likedProducts');
    window.dispatchEvent(new CustomEvent('likeChange'));
  }, [isLiked, productDetail]);

  if (!productDetail) return null;

  return (
    <div className="relative z-10 mx-auto">
      <div>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-start">
          <div className="flex-1 min-w-0 lg:min-w-[320px] w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-black">{productDetail.name}</h1>
              <button
                onClick={handleLike}
                className={`p-2 sm:p-3 rounded-full transition-colors duration-200 cursor-pointer self-start sm:self-auto ${isLiked ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-400'}`}
                title={isLiked ? 'Bỏ thích' : 'Thích'}>
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${index < Math.floor(displayRate) ? 'text-yellow-400 fill-current' : 'text-gray-100'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">({displayRate})</span>
            </div>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-2xl">⏺ {productDetail.description}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-2xl capitalize">{productDetail.long_description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              <div className="text-xl sm:text-2xl font-bold text-[#222]">${productDetail.price}</div>
              <button
                type="button"
                className="h-full w-full sm:w-[250px] font-semibold px-4 sm:px-6 py-2 bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] cursor-pointer rounded-xl flex items-center justify-center text-white text-sm sm:text-base"
                style={{ border: 'none' }}
              >
                Mua ngay
              </button>
            </div>
          </div>
          <div className="w-full lg:w-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-5 flex flex-col items-center">
            <img src={productDetail.image} alt="Combo" className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover rounded-xl sm:rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
} 