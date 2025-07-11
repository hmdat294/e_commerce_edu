import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";
import { useParams } from "react-router-dom";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("all");

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
        // Xử lý giá có dấu chấm như "897.50"
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
        console.log(price);

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

    return (
        <div className="max-w-[1280px] mx-auto py-8">
            <h1 className="text-[48px] font-bold mb-3">Search</h1>

            {/* Bộ lọc giá */}
            <div className="mb-8">
                <h2 className="text-[24px] font-semibold mb-4">Lọc theo giá</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setPriceFilter("all")}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${priceFilter === "all"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setPriceFilter("under-100")}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${priceFilter === "under-100"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        Dưới $100
                    </button>
                    <button
                        onClick={() => setPriceFilter("100-500")}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${priceFilter === "100-500"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        $100 - $500
                    </button>
                    <button
                        onClick={() => setPriceFilter("500-1000")}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${priceFilter === "500-1000"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        $500 - $1000
                    </button>
                    <button
                        onClick={() => setPriceFilter("over-1000")}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                    >
                        Trên $1000
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-x-5 gap-y-20">
                {filteredSearch.map((item) => (
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
                                <div className="font-bold text-[20px] mt-auto text-blue-600">
                                    ${item.price}
                                </div>
                                <button className="text-white bg-gray-500 rounded-[5px] px-2">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hiển thị thông báo khi không có kết quả */}
            {filteredSearch.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        Không tìm thấy sản phẩm nào.
                    </p>
                    {filteredSearch.length === 0 && priceFilter !== "all" && (<button
                        onClick={() => setPriceFilter("all")}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Xóa bộ lọc
                    </button>)}
                </div>
            )}
        </div>
    );
} 