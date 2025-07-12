import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dataProductDetail } from '../api/api';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';
import { getCookie, setCookie, removeCookie } from '../cookie/cookie';

export default function Detail() {

  const [productsDetail, setProductsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductsDetail = async () => {
      try {
        setLoading(true);
        const response = await dataProductDetail(id);
        setProductsDetail(response.data);

        // Ghi lại lịch sử xem sản phẩm
        recordProductView(id);
      } catch (error) {
        console.error('Error fetching products detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsDetail();
  }, [id]);

  useEffect(() => {
    if (productsDetail) {
      const likedProducts = getCookie('likedProducts');
      if (likedProducts) {
        try {
          const likedIds = JSON.parse(likedProducts);
          setIsLiked(likedIds.includes(productsDetail.id));
        } catch (error) {
          console.error('Error parsing liked products cookie:', error);
        }
      }
    }
  }, [productsDetail]);

  // Hàm ghi lại lịch sử xem sản phẩm
  const recordProductView = (productId) => {
    const viewedCookie = getCookie('viewedProducts');
    let viewedIds = [];

    if (viewedCookie) {
      try {
        viewedIds = JSON.parse(viewedCookie);
      } catch (error) {
        console.error('Error parsing viewed products cookie:', error);
        viewedIds = [];
      }
    }

    // Thêm sản phẩm mới vào đầu danh sách
    if (!viewedIds.includes(productId)) {
      viewedIds.unshift(productId);
      // Giữ tối đa 20 sản phẩm đã xem
      viewedIds = viewedIds.slice(0, 20);
      setCookie('viewedProducts', JSON.stringify(viewedIds));
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (productsDetail && productsDetail.rate) {
    let rate = parseInt(productsDetail.rate.toString().slice(0, 1));
    productsDetail.rate = rate > 5 ? rate / 2 : rate;
  }

  const handleLike = () => {
    if (!productsDetail) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    const likedProducts = getCookie('likedProducts');
    let likedIds = [];

    if (likedProducts) {
      try {
        likedIds = JSON.parse(likedProducts);
      } catch (error) {
        console.error('Error parsing liked products cookie:', error);
        likedIds = [];
      }
    }

    if (newLikedState) {
      if (!likedIds.includes(productsDetail.id)) {
        likedIds.push(productsDetail.id);
        window.dispatchEvent(new CustomEvent('newLike', {
          detail: {
            productName: productsDetail.name,
            action: 'add'
          }
        }));
      }
    } else {
      likedIds = likedIds.filter(id => id !== productsDetail.id);
      window.dispatchEvent(new CustomEvent('newLike', {
        detail: {
          productName: productsDetail.name,
          action: 'remove'
        }
      }));
    }

    if (likedIds.length > 0) setCookie('likedProducts', JSON.stringify(likedIds));
    else removeCookie('likedProducts');

    window.dispatchEvent(new CustomEvent('likeChange'));
  };

  if (productsDetail) return (
    <div>
      <div className="relative z-10 max-w-[1280px] mx-auto pt-10 pb-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          <div className="flex-1 min-w-[320px]">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-medium text-base bg-transparent border-none p-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại trang chủ
            </Link>
            <div className="flex justify-between items-center gap-4 mb-6">
              <h1 className="text-5xl font-bold leading-tight text-black">{productsDetail.name}</h1>

              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-colors duration-200 cursor-pointer ${isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-400'
                  }`}
                title={isLiked ? 'Bỏ thích' : 'Thích'}>
                <svg
                  className="w-10 h-10"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">

                {[...Array(5)].map((value, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.floor(productsDetail.rate)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-100'
                      }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}

              </div>
              <span className="text-gray-600 font-medium">({productsDetail.rate})</span>
            </div>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl">⏺ {productsDetail.description}</p>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl capitalize">{productsDetail.long_description}</p>

            <div className="flex items-center gap-10">
              <div className="text-2xl font-bold text-[#222]">${productsDetail.price}</div>
              <button
                type="button"
                className="h-full w-[250px] font-semibold px-6 py-2 bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] cursor-pointer rounded-xl flex items-center justify-center text-white"
                style={{ border: 'none' }}
              >
                Mua ngay
              </button>
            </div>
          </div>

          <div className="w-full md:w-[500px] bg-white rounded-3xl shadow-2xl p-5 flex flex-col items-center mt-10">
            <img src={productsDetail.image} alt="Combo" className="w-full h-[300px] object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
} 