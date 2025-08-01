import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import { getCookie } from "../cookie/cookie";
import Product from "./layout/Product";
import { ProductCardSkeleton } from "../components/LoadingSkeleton";

export default function Suggestions() {
    const [top16Products, setTop16Products] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const getCategoryCounts = (products, searchHistory, viewedIds, likedIds) => {
        const counts = {};
        if (searchHistory.length && products.length) {
            const productOccurrences = {};
            searchHistory.forEach(term => {
                products.forEach(product => {
                    if (
                        product.name.toLowerCase().includes(term.toLowerCase()) ||
                        product.description.toLowerCase().includes(term.toLowerCase())
                    ) {
                        productOccurrences[product.id] = (productOccurrences[product.id] || 0) + 1;
                    }
                });
            });
            Object.keys(productOccurrences).forEach(pid => {
                const prod = products.find(p => p.id == pid);
                if (prod) {
                    const cat = prod.category || 'Không phân loại';
                    counts[cat] = (counts[cat] || 0) + 1;
                }
            });
        }
        viewedIds.forEach(pid => {
            const prod = products.find(p => p.id == pid);
            if (prod) {
                const cat = prod.category || 'Không phân loại';
                counts[cat] = (counts[cat] || 0) + 1;
            }
        });
        likedIds.forEach(pid => {
            const prod = products.find(p => p.id == pid);
            if (prod) {
                const cat = prod.category || 'Không phân loại';
                counts[cat] = (counts[cat] || 0) + 1;
            }
        });
        return counts;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let productList = [];
            try {
                const res = await dataProduct();
                productList = res.data || [];
            } catch { }

            let searchHistory = [];
            let viewedIds = [];
            let likedIds = [];
            try {
                searchHistory = JSON.parse(getCookie('searchHistory')) || [];
            } catch { }
            try {
                viewedIds = JSON.parse(getCookie('viewedProducts')) || [];
            } catch { }
            try {
                likedIds = JSON.parse(getCookie('likedProducts')) || [];
            } catch { }

            const categoryCounts = getCategoryCounts(productList, searchHistory, viewedIds, likedIds);

            const productsByCategory = {};
            productList.forEach(prod => {
                const cat = prod.category || 'Không phân loại';
                if (!productsByCategory[cat]) productsByCategory[cat] = [];
                productsByCategory[cat].push(prod);
            });

            const sortedCategories = Object.entries(categoryCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([cat]) => cat);

            const result = [];
            const addedIds = new Set();
            for (const cat of sortedCategories) {
                let count = 0;
                for (const prod of productsByCategory[cat] || []) {
                    if (!addedIds.has(prod.id) && count < 5) {
                        result.push(prod);
                        addedIds.add(prod.id);
                        count++;
                        if (result.length === 16) break;
                    }
                }
                if (result.length === 16) break;
            }

            setTop16Products(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = top16Products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(top16Products.length / productsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="max-w-[1280px] mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold mb-3 text-[#1a1337]">Sản phẩm gợi ý</h1>
            <p className="text-gray-500 text-base text-sm mb-4">Danh sách gợi ý dựa trên lịch sử tìm kiếm, lượt xem, yêu thích của bạn và đưa ra các sản phẩm liên quan!</p>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                    {[...Array(productsPerPage)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            ) : top16Products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                    {currentProducts.map((item) => (
                        <Product key={item.id} data={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <div className="text-gray-500 text-base sm:text-lg mb-4">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <p>Chưa có sản phẩm nào được gợi ý</p>
                    </div>
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
                                }`}>
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
                                        : 'text-gray-700 hover:bg-gray-50'}`}
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
