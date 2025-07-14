import React, { useEffect, useState, useMemo, useCallback } from "react";
import { dataProduct } from "../api/api";
import { Link, useParams } from "react-router-dom";
import Product from "./layout/Product";
import { ProductCardSkeleton } from "../components/LoadingSkeleton";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFilter, setPriceFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const productsPerPage = 6;
    const { keyword } = useParams();

    useEffect(() => {
        setLoading(true);
        dataProduct()
            .then(res => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filterByPrice = useCallback((product) => {
        let price = product.price;
        if (typeof price === "string") {
            price = parseFloat(price.replace(/[^\d.]/g, ""));
        }
        if (isNaN(price)) return false;
        switch (priceFilter) {
            case "under-100": return price < 100;
            case "100-500": return price >= 100 && price <= 500;
            case "500-1000": return price > 500 && price <= 1000;
            case "over-1000": return price > 1000;
            default: return true;
        }
    }, [priceFilter]);

    const filteredSearch = useMemo(() => (
        keyword
            ? products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()) && filterByPrice(product))
            : products.filter(filterByPrice)
    ), [products, keyword, filterByPrice]);

    const totalPages = useMemo(() => Math.ceil(filteredSearch.length / productsPerPage), [filteredSearch, productsPerPage]);
    const currentProducts = useMemo(() => (
        filteredSearch.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
    ), [filteredSearch, currentPage, productsPerPage]);

    const handlePageChange = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
    const handlePrevPage = useCallback(() => setCurrentPage(p => Math.max(1, p - 1)), []);
    const handleNextPage = useCallback(() => setCurrentPage(p => Math.min(totalPages, p + 1)), [totalPages]);

    const handleFilterChange = (value) => {
        setPriceFilter(value);
        setCurrentPage(1);
        setShowFilters(false);
    };

    return (
        <div className="max-w-[1280px] mx-auto py-8 sm:py-12 lg:py-15 px-4 sm:px-6 lg:px-8">
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm"
                >
                    <span className="font-medium text-gray-700">Sắp xếp theo giá</span>
                    <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className={`lg:block ${showFilters ? 'block' : 'hidden'} mb-6 lg:mb-8 w-full lg:w-[20%]`}>
                    <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold mb-4 text-[#1a1337]">Sắp xếp theo giá</h2>
                    <ul className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        {[
                            { value: "all", label: "Tất cả" },
                            { value: "under-100", label: "Dưới 100$" },
                            { value: "100-500", label: "100$ - 500$" },
                            { value: "500-1000", label: "500$ - 1000$" },
                            { value: "over-1000", label: "Trên 1000$" },
                        ].map(opt => (
                            <li key={opt.value}>
                                <label className={`px-3 sm:px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === opt.value ? "bg-gray-100" : ""}`}>
                                    <input
                                        type="radio"
                                        name="priceFilter"
                                        value={opt.value}
                                        checked={priceFilter === opt.value}
                                        onChange={() => handleFilterChange(opt.value)}
                                        className="accent-gray-500 w-4 h-4"
                                    />
                                    <span className="text-sm sm:text-base">{opt.label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full lg:w-[80%]">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                            {[...Array(productsPerPage)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-x-5 lg:gap-y-20">
                            {currentProducts.map((item) => (
                                <Product key={item.id} data={item} />
                            ))}
                        </div>
                    )}

                    {filteredSearch.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <p className="text-gray-500 text-base sm:text-lg">
                                Không tìm thấy sản phẩm nào.
                            </p>
                            {filteredSearch.length === 0 && priceFilter !== "all" && (<button
                                onClick={() => setPriceFilter("all")}
                                className="mt-4 bg-[#1a1337] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#1a1337]/80 transition-colors cursor-pointer text-sm sm:text-base"
                            >
                                Xóa bộ lọc
                            </button>)}
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
                                        }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 