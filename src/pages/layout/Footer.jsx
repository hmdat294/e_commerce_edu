import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1337] pt-16 pb-6 text-white overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <div className="font-bold text-2xl leading-tight">E Commrece Edu</div>
            </div>
          </div>
        </div>

      
        <div className="w-full flex flex-row justify-center items-center gap-16 mb-10">
         
          <div className="flex flex-col gap-2 min-w-[160px]">
            <div className="font-semibold mb-2">Product</div>
            <a href="#" className="hover:underline">Courses</a>
            <a href="#" className="hover:underline">Blogs</a>
            <a href="#" className="hover:underline">Contact us</a>
          </div>
          <div className="flex flex-col gap-2 min-w-[180px]">
            <div className="font-semibold mb-2">General policies & support</div>
            <a href="#" className="hover:underline">Blogs</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Privacy policy</a>
          </div>
          
          <div className="flex flex-col min-w-[340px]">
            <div className="font-normal mb-3">Contact us</div>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-6 py-3 rounded-l-full bg-white/10 text-white placeholder-gray-300 focus:outline-none border-none text-base"
              />
              <button
                type="button"
                className="px-8 py-3 rounded-r-full bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Send
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-8">
          <div className="text-sm text-gray-300 mb-2">
            Copyright © E Commrece Edu | All right reserved
          </div>
        </div>
      </div>
    </footer>
  );
} 