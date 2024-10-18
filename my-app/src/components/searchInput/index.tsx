import React from 'react';

const SearchInput = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white h-[58px] ">
      {/* Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 4a7 7 0 017 7 7 7 0 01-7 7 7 7 0 01-7-7 7 7 0 017-7zm0 0l6 6"
        />
      </svg>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none text-gray-700 " 
      />
    </div>
  );
};

export default SearchInput;
