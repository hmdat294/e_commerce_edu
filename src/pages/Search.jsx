import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import { Link, useParams } from "react-router-dom";
import Product from "./layout/Product";
import { ProductCardSkeleton } from "../components/LoadingSkeleton";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFilter, setPriceFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

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

    const { keyword } = useParams();

    // Hàm lọc theo giá
    const filterByPrice = (product) => {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));

        switch (priceFilter) {
            case "under-100":
                return price < 100;
            case "100-500":
                return price >= 100 && price <= 500;
            case "500-1000":
                return price > 500 && price <= 1000;
            case "over-1000":
                return price > 1000;
            default:
                return true;
        }
    };

    const filteredSearch = keyword ? products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase()) && filterByPrice(product)
    ) : products.filter(filterByPrice);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredSearch.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredSearch.length / productsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="max-w-[1280px] mx-auto py-15">
            <div className="flex gap-10">
                <div className="mb-8 w-[20%]">
                    <h2 className="text-[24px] font-semibold mb-4">Sắp xếp theo giá</h2>
                    <ul className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <li>
                            <label className={`px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === "all" ? "bg-gray-100" : ""}`}>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="all"
                                    checked={priceFilter === "all"}
                                    onChange={() => { setPriceFilter("all"); setCurrentPage(1); }}
                                    className="accent-gray-500 w-4 h-4"
                                />
                                <span >Tất cả</span>
                            </label>
                        </li>
                        <li>
                            <label className={`px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === "under-100" ? "bg-gray-100" : ""}`}>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="under-100"
                                    checked={priceFilter === "under-100"}
                                    onChange={() => { setPriceFilter("under-100"); setCurrentPage(1); }}
                                    className="accent-gray-500 w-4 h-4"
                                />
                                <span>Dưới 100$</span>
                            </label>
                        </li>
                        <li>
                            <label className={`px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === "100-500" ? "bg-gray-100" : ""}`}>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="100-500"
                                    checked={priceFilter === "100-500"}
                                    onChange={() => { setPriceFilter("100-500"); setCurrentPage(1); }}
                                    className="accent-gray-500 w-4 h-4"
                                />
                                <span>100$ - 500$</span>
                            </label>
                        </li>
                        <li>
                            <label className={`px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === "500-1000" ? "bg-gray-100" : ""}`}>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="500-1000"
                                    checked={priceFilter === "500-1000"}
                                    onChange={() => { setPriceFilter("500-1000"); setCurrentPage(1); }}
                                    className="accent-gray-500 w-4 h-4"
                                />
                                <span>500$ - 1000$</span>
                            </label>
                        </li>
                        <li>
                            <label className={`px-4 py-2 border-b border-gray-200 flex items-center gap-2 cursor-pointer ${priceFilter === "over-1000" ? "bg-gray-100" : ""}`}>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="over-1000"
                                    checked={priceFilter === "over-1000"}
                                    onChange={() => { setPriceFilter("over-1000"); setCurrentPage(1); }}
                                    className="accent-gray-500 w-4 h-4"
                                />
                                <span>Trên 1000$</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="w-[80%]">
                    {loading ? (
                        <div className="grid grid-cols-3 gap-x-5 gap-y-20">
                            {[...Array(6)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-x-5 gap-y-20">
                            {currentProducts.map((item) => (
                                <Product key={item.id} data={item} />
                            ))}
                        </div>
                    )}

                    {filteredSearch.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Không tìm thấy sản phẩm nào.
                            </p>
                            {filteredSearch.length === 0 && priceFilter !== "all" && (<button
                                onClick={() => setPriceFilter("all")}
                                className="mt-4 bg-[#1a1337] text-white px-6 py-2 rounded-lg hover:bg-[#1a1337]/80 transition-colors cursor-pointer"
                            >
                                Xóa bộ lọc
                            </button>)}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12">
                            <div className="flex border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`w-12 h-12 flex items-center justify-center border-r border-gray-200 transition-colors ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'hover:bg-gray-100 text-gray-500'
                                        }`}>
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
                                    className={`w-12 h-12 flex items-center justify-center border-l border-gray-200 transition-colors ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'hover:bg-gray-100 text-gray-500'
                                        }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
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