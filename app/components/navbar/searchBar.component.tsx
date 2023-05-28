'use client';

import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-around w-[350px] border-[1px] shadow-md rounded-full p-2 pr-0 font-semibold text-sm">
      <div>Anywhere</div>
      <div className="border-x-[1px] px-3">Any week</div>
      <div className="text-gray-400">Add guests</div>
      <div className="bg-rose-500 rounded-full text-white p-2">
        <BiSearch size={14} />
      </div>
    </div>
  );
};

export default SearchBar;
