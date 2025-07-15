import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCookie, setCookie, removeCookie } from '../../cookie/cookie';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Detail from './Detail';

export default function Product({ data: product }) {
    const [isLiked, setIsLiked] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function syncLike() {
            try {
                const likedIds = JSON.parse(getCookie('likedProducts') || '[]');
                setIsLiked(likedIds.includes(product.id));
            } catch {
                setIsLiked(false);
            }
        }
        window.addEventListener('likeChange', syncLike);
        syncLike();
        return () => window.removeEventListener('likeChange', syncLike);
    }, [product.id]);

    const handleLike = useCallback(() => {
        let likedIds = [];
        try {
            likedIds = JSON.parse(getCookie('likedProducts') || '[]');
        } catch { }
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        if (newLiked) {
            if (!likedIds.includes(product.id)) {
                likedIds.push(product.id);
                window.dispatchEvent(new CustomEvent('newLike', { detail: { productName: product.name, action: 'add' } }));
            }
        } else {
            likedIds = likedIds.filter(id => id !== product.id);
            window.dispatchEvent(new CustomEvent('newLike', { detail: { productName: product.name, action: 'remove' } }));
        }
        likedIds.length ? setCookie('likedProducts', JSON.stringify(likedIds)) : removeCookie('likedProducts');
        window.dispatchEvent(new CustomEvent('likeChange'));
    }, [isLiked, product.id, product.name]);

    return (
        <>
            <div className="h-[370px] bg-white rounded-tl-[30px] rounded-br-[30px] shadow-2xl flex flex-col overflow-hidden duration-300 ease-in-out group hover:h-[415px]">
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-[160px] object-cover" />
                </div>
                <div className="flex flex-col p-5">
                    <div className="line-clamp-1 font-bold text-[20px] mb-2">{product.name}</div>
                    <div className="text-[14px] mb-4">
                        <div className="line-clamp-1 duration-300 ease-in-out h-[25px] group-hover:line-clamp-none group-hover:h-[70px]">⏺ {product.description}</div>
                    </div>
                    <div className="flex justify-between products-center mb-4">
                        <div className="font-bold text-[20px] mt-auto">${product.price}</div>
                        <button
                            onClick={handleLike}
                            className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${isLiked ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-400'}`}
                            title={isLiked ? 'Bỏ thích' : 'Thích'}>
                            <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex">
                        <button onClick={() => setOpen(true)}
                            className="cursor-pointer w-full text-center text-white bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] transition-colors duration-200 rounded-tl-[15px] rounded-br-[15px] px-3 py-2">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <DialogPanel
                            transition
                            className="sm:max-w-[80%] p-10 md:py-15 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 
                            data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out 
                            data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute cursor-pointer top-1 right-1 p-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                                aria-label="Đóng">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="bg-white">
                                <Detail key={product.id} data={product} />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
