import React, { useState, useEffect } from 'react';
import { dataProduct } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../../cookie/cookie';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [products, setProducts] = useState([]);
    const [likedCount, setLikedCount] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');

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

    useEffect(() => {
        const updateLikedCount = () => {
            const likedProducts = getCookie('likedProducts');
            if (likedProducts) {
                try {
                    const likedIds = JSON.parse(likedProducts);
                    setLikedCount(likedIds.length);
                } catch (error) {
                    console.error('Error parsing liked products cookie:', error);
                    setLikedCount(0);
                }
            } else {
                setLikedCount(0);
            }
        };

        updateLikedCount();

        const handleLikeChange = () => updateLikedCount();

        window.addEventListener('likeChange', handleLikeChange);
        return () => window.removeEventListener('likeChange', handleLikeChange);
    }, []);

    useEffect(() => {
        const handleNewLike = (event) => {
            const { productName, action } = event.detail;
            if (action === 'add') {
                setNotificationMessage(`Đã thêm "${productName}" vào danh sách yêu thích!`);
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            } else if (action === 'remove') {
                setNotificationMessage(`Đã xóa "${productName}" khỏi danh sách yêu thích!`);
                setNotificationType('info');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            }
        };

        window.addEventListener('newLike', handleNewLike);
        return () => window.removeEventListener('newLike', handleNewLike);
    }, []);

    const filteredResults = (searchQuery.trim()) ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="bg-[#1a1337] text-white p-0 relative">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px]">

                <Link to="/" className="flex items-center gap-2">
                    <span className="font-semibold text-[20px] ml-2">E Commrece Edu</span>
                </Link>

                <nav className="flex items-center gap-8">
                    <Link to="/blog" className="text-white no-underline font-medium">Bài viết</Link>
                    <Link to="/contact" className="text-white no-underline font-medium">Liên hệ</Link>
                    <Link to="/about" className="text-white no-underline font-medium">Giới thiệu</Link>
                    <Link to="/suggestions" className="text-white no-underline font-medium">Gợi ý sản phẩm</Link>
                </nav>

                <div className="flex items-center gap-6 text-[20px] cursor-pointer">
                    <div className="relative">
                        <form onSubmit={handleSearch} className="flex items-center shadow-lg rounded-xl overflow-hidden bg-transparent">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="w-[340px] px-6 py-2 bg-white/10 text-gray-200 placeholder-gray-400 focus:outline-none border-none rounded-l-xl text-base"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="h-full px-6 py-2 bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] cursor-pointer rounded-r-xl flex items-center justify-center"
                                style={{ border: 'none' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                                </svg>
                            </button>
                        </form>

                        {!isFocused || filteredResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white text-black rounded-lg shadow-lg mt-1 z-50 max-h-[400px] overflow-y-auto">
                                {filteredResults.map((result) => (
                                    <Link to={`/product/${result.id}`} key={result.id}
                                        className="px-4 py-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 flex items-center gap-3">
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{result.name}</div>
                                            <div className="text-xs text-gray-600 line-clamp-1">{result.description}</div>
                                            <div className="text-sm font-bold">${result.price}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {searchQuery.trim() && filteredResults.length === 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white text-black rounded-lg shadow-lg mt-1 z-50 p-4">
                                <div className="text-gray-500 text-center">Không tìm thấy sản phẩm phù hợp</div>
                            </div>
                        )}
                    </div>

                    <Link to="/favorite" className="relative">
                        <button className='p-2 rounded-full transition-colors duration-200 cursor-pointer text-white bg-gradient-to-r from-[#7f5fff] to-[#5f3fff]'>
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            {likedCount > 0 && (
                                <div className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {likedCount > 99 ? '99+' : likedCount}
                                </div>
                            )}
                        </button>
                    </Link>
                </div>
            </div>

            {showNotification && (
                <div className={`fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in ${notificationType === 'success'
                        ? 'bg-blue-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                    <div className="flex items-center gap-2">
                        {notificationType === 'success' ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className="text-sm font-medium">{notificationMessage}</span>
                    </div>
                </div>
            )}
        </header>
    );
} 