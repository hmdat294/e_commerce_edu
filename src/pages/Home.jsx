import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import Product from "./layout/Product";
import { ProductCardSkeleton } from "../components/LoadingSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    setLoading(true);
    dataProduct()
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-[1280px] mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold mb-3 text-[#1a1337]">Sản phẩm</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
          {[...Array(productsPerPage)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
          {currentProducts.map((item) => (
            <Product key={item.id} data={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 sm:mt-10 lg:mt-12">
          <div className="flex border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-r border-gray-200 transition-colors ${currentPage === 1
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-r border-gray-200 font-medium transition-colors text-sm sm:text-base
                  ${currentPage === pageNumber
                    ? 'text-orange-500 bg-gray-100 cursor-default'
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
                disabled={currentPage === pageNumber}
                style={{ borderRight: pageNumber === totalPages ? 'none' : undefined }}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-l border-gray-200 transition-colors ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 