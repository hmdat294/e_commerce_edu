import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import Product from "./layout/Product";
import { getCookie, setCookie, removeCookie } from "../cookie/cookie";
import { ProductCardSkeleton } from "../components/LoadingSkeleton";

export default function History() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await dataProduct();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const viewedCookie = getCookie('viewedProducts');
        if (viewedCookie) {
            try {
                const viewedIds = JSON.parse(viewedCookie);
                setViewedProducts(viewedIds);
            } catch (error) {
                console.error('Error parsing viewed products cookie:', error);
            }
        }
    }, []);

    const recordView = (productId) => {
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

        if (!viewedIds.includes(productId)) {
            viewedIds.unshift(productId);
            viewedIds = viewedIds.slice(0, 20);
            setCookie('viewedProducts', JSON.stringify(viewedIds));
            setViewedProducts(viewedIds);
        }
    };

    const getRecentViewed = () => {
        return products.filter(product => viewedProducts.includes(product.id));
    };

    // Hàm xóa lịch sử
    const clearHistory = () => {
        removeCookie('viewedProducts');
        setViewedProducts([]);
        setCurrentPage(1);
    };

    // Pagination logic cho sản phẩm đã xem
    const recentViewedProducts = getRecentViewed();
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = recentViewedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(recentViewedProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="max-w-[1280px] mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#1a1337]">Sản phẩm đã xem</h1>
                {viewedProducts.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                        <div className="bg-white rounded-lg p-3 sm:p-4 flex items-center gap-2">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">{viewedProducts.length}</div>
                            <div className="text-gray-600 text-sm sm:text-base">Sản phẩm đã xem</div>
                        </div>
                        <button
                            onClick={clearHistory}
                            className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer text-sm sm:text-base">
                            Xóa lịch sử
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                    {[...Array(productsPerPage)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            ) : viewedProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                        {currentProducts.map((item) => (
                            <div key={item.id} onClick={() => recordView(item.id)}>
                                <Product data={item} />
                            </div>
                        ))}
                    </div>

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
                </>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <div className="text-gray-500 text-base sm:text-lg mb-4">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <p>Chưa có sản phẩm nào được xem</p>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">Hãy xem một số sản phẩm để thấy chúng ở đây!</p>
                </div>
            )}

        </div>
    );
}
