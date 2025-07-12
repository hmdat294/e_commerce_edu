import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import { Link, useParams } from "react-router-dom";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

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
                    <h2 className="text-[24px] font-semibold mb-4">Sort by price</h2>
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
                                <span>Dưới $100</span>
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
                                <span>$100 - $500</span>
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
                                <span>$500 - $1000</span>
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
                                <span>Trên $1000</span>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="w-[80%]">
                    <div className="grid grid-cols-3 gap-x-5 gap-y-20">
                        {currentProducts.map((item) => (
                            <div
                                key={item.id}
                                className="h-[310px] bg-white rounded-[20px] shadow-xl flex flex-col overflow-hidden duration-300 ease-in-out group hover:h-[355px]"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-[160px] object-cover"
                                    />
                                </div>

                                <div className="flex flex-col p-5">
                                    <div className="line-clamp-1 font-bold text-[20px] mb-2">
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
                                        <Link to={`/product/${item.id}`} className="text-white bg-[#1a1337] rounded-[5px] px-3 py-1">
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredSearch.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Không tìm thấy sản phẩm nào.
                            </p>
                            {filteredSearch.length === 0 && priceFilter !== "all" && (<button
                                onClick={() => setPriceFilter("all")}
                                className="mt-4 px-6 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
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