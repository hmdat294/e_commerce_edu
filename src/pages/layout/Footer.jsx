import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1337] pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 text-white overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <div className="font-bold text-xl sm:text-2xl leading-tight text-center">E Commrece Edu</div>
            </div>
          </div>
        </div>


        <div className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 sm:gap-12 lg:gap-10 mb-8 sm:mb-10">

          <div className="flex flex-col gap-2 min-w-[160px] text-center sm:text-left">
            <div className="font-semibold mb-2 text-sm sm:text-base">Product</div>
            <a href="#" className="hover:underline text-sm sm:text-base">Courses</a>
            <a href="#" className="hover:underline text-sm sm:text-base">Blogs</a>
            <a href="#" className="hover:underline text-sm sm:text-base">Contact us</a>
          </div>
          <div className="flex flex-col gap-2 min-w-[180px] text-center sm:text-left">
            <div className="font-semibold mb-2 text-sm sm:text-base">General policies & support</div>
            <a href="#" className="hover:underline text-sm sm:text-base">Blogs</a>
            <a href="#" className="hover:underline text-sm sm:text-base">Terms of service</a>
            <a href="#" className="hover:underline text-sm sm:text-base">Privacy policy</a>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col lg:items-start justify-center items-center gap-5 min-w-[280px] sm:min-w-[340px] w-full sm:col-span-2 lg:col-span-1">
            <div className="font-normal text-sm sm:text-base text-center sm:text-left">Contact us</div>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-l-full bg-white/10 text-white placeholder-gray-300 focus:outline-none border-none text-sm sm:text-base"
              />
              <button
                type="button"
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-r-full bg-gradient-to-r from-[#7f5fff] to-[#5f3fff] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-all text-sm sm:text-base"
              >
                Send
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>

          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-6 sm:mt-8">
          <div className="text-xs sm:text-sm text-gray-300 mb-2 text-center">
            Copyright © E Commrece Edu | All right reserved
          </div>
        </div>
      </div>
    </footer>
  );
} 