import React, { useState, useEffect } from 'react';
import { dataProduct } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
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
                    <a href="#" className="text-white no-underline font-medium">Blog</a>
                    <a href="#" className="text-white no-underline font-medium">Contact</a>
                </nav>

                <div className="flex items-center gap-6 text-[20px] cursor-pointer">
                    <div className="relative">
                        <form onSubmit={handleSearch} className="flex items-center shadow-lg rounded-xl overflow-hidden bg-transparent">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-[340px] px-6 py-2 bg-white/10 text-gray-200 placeholder-gray-400 focus:outline-none border-none rounded-l-xl text-base"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
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
                                    <div
                                        key={result.id}
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 flex items-center gap-3"
                                    >
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
                                    </div>
                                ))}
                            </div>
                        )}
                        {searchQuery.trim() && filteredResults.length === 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white text-black rounded-lg shadow-lg mt-1 z-50 p-4">
                                <div className="text-gray-500 text-center">Không tìm thấy sản phẩm phù hợp</div>
                            </div>
                        )}


                    </div>
                    <span>🔔</span>
                    <span>🌐</span>
                    <span>🎁</span>
                </div>
            </div>
        </header>
    );
} 