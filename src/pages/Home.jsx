import React, { useEffect, useState } from "react";
import { dataProduct } from "../api/api";

export default function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="max-w-[1280px] mx-auto py-8">
      <h1 className="text-[48px] font-bold mb-3">Combo</h1>

      <div className="grid grid-cols-4 gap-x-5 gap-y-20">
        {products.map((item) => (
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
    </div>

  );
} 