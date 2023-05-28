'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { IoPersonCircle } from 'react-icons/io5';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

const Menu = () => {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-sm font-semibold">Airbnb your home</div>
      <div>
        <HiOutlineGlobeAlt size={16} />
      </div>
      <div className="flex items-center border-[1px] rounded-full p-1 pl-2 gap-3">
        <AiOutlineMenu size={14} />
        <div className="text-gray-500">
          <IoPersonCircle size={26} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
