import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dataProduct();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
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
    <div className="max-w-[1280px] mx-auto py-8">
      <h1 className="text-[48px] font-bold mb-3">Combo</h1>

      <div className="grid grid-cols-4 gap-x-5 gap-y-20">
        {currentProducts.map((item) => (
          <div
            key={item.id}
            className="h-[305px] bg-white rounded-[20px] shadow-xl flex flex-col overflow-hidden duration-300 ease-in-out group hover:h-[350px]"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[160px] object-cover"
              />
            </div>

            <div className="flex flex-col p-5">
              <div className="font-bold text-[20px] mb-2">
                {item.name}
              </div>

              <div className="text-[14px] mb-4">
                <div className="line-clamp-1 duration-300 ease-in-out h-[25px] group-hover:line-clamp-none group-hover:h-[70px]">
                  ⏺ {item.description}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-bold text-[20px] mt-auto">
                  ${item.price}
                </div>
                <button className="text-white bg-[#1a1337] rounded-[5px] px-2">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12">
          <div className="flex border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-12 h-12 flex items-center justify-center border-r border-gray-200 transition-colors ${currentPage === 1
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-12 h-12 flex items-center justify-center border-r border-gray-200 font-medium transition-colors
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
              className={`w-12 h-12 flex items-center justify-center border-l border-gray-200 transition-colors ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-500'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 