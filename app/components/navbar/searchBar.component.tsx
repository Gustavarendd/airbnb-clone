'use client';

import { BiSearch } from 'react-icons/bi';
import useSearchModal from '@/app/hooks/useSearchModal';

const SearchBar = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="flex items-center col-span-3 lg:col-span-1 justify-around w-fit gap-3 border-[1px] shadow-md rounded-full p-1 pl-4 font-semibold text-xs justify-self-center"
    >
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
