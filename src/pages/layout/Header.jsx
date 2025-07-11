import React, { useState, useEffect } from 'react';
import { dataProduct } from '../../api/api';
import { useNavigate } from 'react-router-dom';

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
        <header className="bg-[#000] text-white p-0 relative">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px]">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[20px] ml-2">E Commrece Edu</span>
                </div>

                {/* Menu */}
                <nav className="flex items-center gap-8">
                    <a href="#" className="text-white no-underline font-medium">
                        Courses <span className="text-[12px]">▼</span>
                    </a>
                    <a href="#" className="text-white no-underline font-medium">Blog</a>
                    <a href="#" className="text-white no-underline font-medium">Contact</a>
                </nav>



                <div className="flex items-center gap-6 text-[20px] cursor-pointer">
                    <div className="relative">
                        <form onSubmit={handleSearch} className="flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-[300px] px-4 py-1 rounded-l-lg text-white bg-gray-500"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                            />
                            <button
                                type="submit"
                                className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors"
                            >
                                🔍
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
                                            <div className="text-sm font-bold text-blue-600">${result.price}</div>
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