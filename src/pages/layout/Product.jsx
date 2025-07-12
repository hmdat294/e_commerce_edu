import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getCookie, setCookie, removeCookie } from '../../cookie/cookie';

export default function Product(data) {

    const product = data.data;
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const likedProducts = getCookie('likedProducts');
        if (likedProducts) {
            try {
                const likedIds = JSON.parse(likedProducts);
                setIsLiked(likedIds.includes(product.id));
            } catch (error) {
                console.error('Error parsing liked products cookie:', error);
            }
        }
    }, [product.id]);

    const handleLike = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);

        const likedProducts = getCookie('likedProducts');
        let likedIds = [];

        if (likedProducts) likedIds = JSON.parse(likedProducts);

        if (newLikedState) {
            if (!likedIds.includes(product.id)) {
                likedIds.push(product.id);
                window.dispatchEvent(new CustomEvent('newLike', {
                    detail: {
                        productName: product.name,
                        action: 'add'
                    }
                }));
            }
        } else {
            likedIds = likedIds.filter(id => id !== product.id);
            window.dispatchEvent(new CustomEvent('newLike', {
                detail: {
                    productName: product.name,
                    action: 'remove'
                }
            }));
        }

        if (likedIds.length > 0) setCookie('likedProducts', JSON.stringify(likedIds));
        else removeCookie('likedProducts');

        window.dispatchEvent(new CustomEvent('likeChange'));
    };

    return (
        <div
            key={product.id}
            className="h-[360px] bg-white rounded-[20px] shadow-xl flex flex-col overflow-hidden duration-300 ease-in-out group hover:h-[405px]"
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[160px] object-cover"
                />
            </div>

            <div className="flex flex-col p-5">
                <div className="line-clamp-1 font-bold text-[20px] mb-2">
                    {product.name}
                </div>

                <div className="text-[14px] mb-4">
                    <div className="line-clamp-1 duration-300 ease-in-out h-[25px] group-hover:line-clamp-none group-hover:h-[70px]">
                        ⏺ {product.description}
                    </div>
                </div>

                <div className="flex justify-between products-center mb-4">
                    <div className="font-bold text-[20px] mt-auto">
                        ${product.price}
                    </div>
                    <button
                        onClick={handleLike}
                        className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${isLiked
                                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-400'
                            }`}
                        title={isLiked ? 'Bỏ thích' : 'Thích'}>
                        <svg
                            className="w-5 h-5"
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

                <div className="flex">
                    <Link to={`/product/${product.id}`} className="w-full text-center text-white bg-[#1a1337] hover:bg-[#1a1337]/80 transition-colors duration-200 rounded-[5px] px-3 py-1">
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    )
}
